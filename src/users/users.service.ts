import {
  Injectable,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { encodePassword } from 'src/utils/bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { username, email, password } = createUserDto;

    const existingUser = await this.userRepository.findOne({
      where: { username },
    });
    if (existingUser) {
      throw new ConflictException('O nome de usuário já existe');
    }

    const existingEmail = await this.userRepository.findOne({
      where: { email },
    });
    if (existingEmail) {
      throw new ConflictException('O e-mail já existe');
    }

    const hashedPassword = encodePassword(password);
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    await this.userRepository.save(user);

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async findAll() {
    const users = await this.userRepository.find({
      relations: ['albumcompleted'],
    });
    return users.map(({ password, albumcompleted, ...rest }) => ({
      ...rest,
      album: albumcompleted || null,
    }));
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new BadRequestException('Usuário não encontrado');

    const { password, confirm_password, ...userWithoutPassword } = user;
    return { ...userWithoutPassword, album: user.albumcompleted || null };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    console.log('User found:', id, user);
    if (!user) throw new BadRequestException('Usuário não encontrado');
    try {
      await this.userRepository.remove(user);
      return { message: 'Usuário removido com sucesso' };
    } catch (error) {
      console.error('Erro ao remover usuário:', error);
      throw new BadRequestException('Erro ao remover usuário');
    }
  }
}
