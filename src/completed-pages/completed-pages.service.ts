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

  async create(userId: number, createCompletedPageDto: CompletePageDto) {
    const { pageIndex } = createCompletedPageDto;
    const user = await this.usersRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    const existing = await this.completedPageRepo.findOne({
      where: { user: { id: userId }, page_index: pageIndex },
    });
    if (existing) {
      throw new ConflictException('Página já foi completada');
    }

    // lógica do ticket crescente que falamos antes
    const lastEntry = await this.completedPageRepo.findOne({
      order: { ticket: 'DESC' },
    });
    const nextTicket = lastEntry ? Number(lastEntry.ticket) + 1 : 1;

    const newEntry = this.completedPageRepo.create({
      user,
      page_index: pageIndex,
      ticket: String(nextTicket),
    });
    await this.completedPageRepo.save(newEntry);
    return { ticket: nextTicket };
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

  findOne(id: number) {
    return `This action returns a #${id} completedPage`;
  }

  update(id: number, updateCompletedPageDto: UpdateCompletedPageDto) {
    return `This action updates a #${id} completedPage`;
  }

  remove(id: number) {
    return `This action removes a #${id} completedPage`;
  }
}
