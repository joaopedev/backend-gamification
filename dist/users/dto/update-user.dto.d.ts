import { CreateUserDto } from './create-user.dto';
declare const UpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
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
export {};
