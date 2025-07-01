import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    level?: number;
    coins?: number; 
    stickers_number?: number;
    image_url?: string;
    name?: string;
    username?: string;
    email?: string;
    password?: string;
    confirm_password?: string;
    deleted_at?: Date | null;
}
