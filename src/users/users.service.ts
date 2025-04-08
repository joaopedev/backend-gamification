import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { encodePassword } from 'src/utils/bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}
  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    try {
      const existingUser = await this.userRepository.findOne({ where: { username: createUserDto.username } });
      if (existingUser) {
        throw new Error('Username already exists');
      }
      const existingEmail = await this.userRepository.findOne({ where: { email: createUserDto.email } });
      if (existingEmail) {
        throw new Error('Email already exists');
      }
    } catch (error) {
      throw new Error('Error checking existing user: ' + error.message);
    }
    // Hash the password before saving it to the database
    const hashedPassword = encodePassword(createUserDto.password);
    createUserDto.password = hashedPassword;
    await this.userRepository.save(user);
    return user;
  }

  async findAll() {
    const users = await this.userRepository.find();
    return users.map(user => {
      const { password, ...userWithoutPassword } = user; // Exclude password from the response
      return userWithoutPassword;
    }
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
