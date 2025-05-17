import { IsBoolean } from 'class-validator';

export class UpdatePastedDto {
  @IsBoolean()
  pasted: boolean;
}