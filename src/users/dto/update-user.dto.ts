import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    id: number;
    name: string;
    username: string;
    password: string;
    email: string;
    role: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
    stickers_number: number;
    coins: number;
    conquests: number;  
    last_login: Date;
}
