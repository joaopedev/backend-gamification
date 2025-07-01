import {
  IsAlphanumeric,
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

const passwordRegEx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

export class CreateUserDto {
  @IsString()
  @MinLength(2, { message: 'O nome deve ter pelo menos 2 caracteres.' })
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @MinLength(3, {
    message: 'O nome de usuário deve ter pelo menos 3 caracteres.',
  })
  @IsAlphanumeric(undefined, {
    message:
      'O nome de usuário não permite outros caracteres além dos alfanuméricos.',
  })
  username: string;

  @IsNotEmpty()
  @IsEmail(undefined, { message: 'Forneça um e-mail válido.' })
  email: string;

  @IsNotEmpty()
  @Matches(passwordRegEx, {
    message: `A senha deve conter no mínimo 8 e no máximo 20 caracteres,
pelo menos uma letra maiúscula,
uma letra minúscula,
um número e
um caractere especial`,
  })
  password: string;

  @IsNotEmpty()
  @Matches(passwordRegEx, {
    message: `A senha deve conter no mínimo 8 e no máximo 20 caracteres,
pelo menos uma letra maiúscula,
uma letra minúscula,
um número e
um caractere especial`,
  })
  confirm_password: string;

  @IsOptional()
  @IsString()
  image_url?: string;

  @IsOptional()
  @IsEmpty()
  @IsNumber()
  level?: number;
}
