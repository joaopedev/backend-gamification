import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateCompletedPageDto } from './dto/update-completed-page.dto';
import { CompletedPage } from './entities/completed-page.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/entities/user.entity';
import { CompletePageDto } from './dto/create-completed-page.dto';

@Injectable()
export class CompletedPagesService {
  constructor(
    @InjectRepository(CompletedPage)
    private readonly completedPageRepo: Repository<CompletedPage>,
    @InjectRepository(Users)
    private readonly usersRepo: Repository<Users>,
  ) {}

  async create(
    userId: number,
    createCompletedPageDto: CompletePageDto,
  ): Promise<{ ticket: string }> {
    const { pageIndex } = createCompletedPageDto;

    const existingPage = await this.completedPageRepo.findOne({
      where: { user: { id: userId }, page_index: pageIndex },
    });

    if (existingPage) {
      throw new ConflictException(
        `Página ${pageIndex} já completada por este usuário.`,
      );
    }

    const ticket = `ticket-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;

    const completedPage = this.completedPageRepo.create({
      user: { id: userId },
      page_index: pageIndex,
      ticket,
    });

    await this.completedPageRepo.save(completedPage);

    const totalCompleted = await this.completedPageRepo.count({
      where: { user: { id: userId } },
    });

    const rewarded = await this.checkAndReward(userId, totalCompleted);
    if (rewarded) {
      console.log(
        `Usuário ${userId} recebeu uma recompensa por completar a página ${pageIndex}.`,
      );
    }

    const lastTicket = await this.completedPageRepo
      .createQueryBuilder('completed-page')
      .where('completed-page.user.id = :userId', { userId })
      .leftJoin('completed.user', 'user')
      .orderBy('completed-page.completed_at', 'DESC')
      .getOne();
    if (!lastTicket) {
      throw new NotFoundException(
        `Página completada mais recente não encontrada para o usuário ${userId}.`,
      );
    }

    return {
      ticket: lastTicket?.ticket || completedPage.ticket,
    };
  }

  async findAll() {
    const completedPages = await this.completedPageRepo.find({
      relations: ['user'],
    });
    return completedPages.map((completedPage) => ({
      id: completedPage.id,
      userId: completedPage.user.id,
      pageIndex: completedPage.page_index,
      ticket: completedPage.ticket,
    }));
  }

  private async checkAndReward(
    userId: number,
    totalCompleted: number,
  ): Promise<boolean> {
    const milestones = [
      { count: 5, coins: 30 },
      { count: 10, coins: 60 },
      { count: 20, coins: 100 },
    ];

    const user = await this.usersRepo.findOneBy({ id: userId });
    if (!user) return false;

    let rewarded = false;

    for (const milestone of milestones) {
      if (totalCompleted === milestone.count) {
        user.coins += milestone.coins;
        await this.usersRepo.save(user);
        rewarded = true;
        break;
      }
    }

    return rewarded;
  }

  async findOne(id: number) {
    const completedPage = await this.completedPageRepo.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!completedPage) {
      throw new NotFoundException(
        `Página completada com ID ${id} não encontrada`,
      );
    }

    return {
      id: completedPage.id,
      userId: completedPage.user.id,
      pageIndex: completedPage.page_index,
      ticket: completedPage.ticket,
    };
  }

  async update(id: number, updateCompletedPageDto: UpdateCompletedPageDto) {
    const page = await this.completedPageRepo.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!page) {
      throw new NotFoundException(
        `Página completada com ID ${id} não encontrada`,
      );
    }

    Object.assign(page, updateCompletedPageDto);
    await this.completedPageRepo.save(page);

    return {
      message: 'Página atualizada com sucesso',
      updated: page,
    };
  }

  async remove(id: number) {
    const page = await this.completedPageRepo.findOne({ where: { id } });

    if (!page) {
      throw new NotFoundException(
        `Página completada com ID ${id} não encontrada`,
      );
    }

    await this.completedPageRepo.remove(page);
    return { message: 'Página removida com sucesso' };
  }
}
