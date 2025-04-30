import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateFriendsRelationshipDto {
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @IsNumber()
  @IsNotEmpty()
  friend_id: number;
}