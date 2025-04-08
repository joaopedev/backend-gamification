import { PartialType } from '@nestjs/mapped-types';
import { CreateFriendsRelationshipDto } from './create-friends-relationship.dto';

export class UpdateFriendsRelationshipDto extends PartialType(CreateFriendsRelationshipDto) {}
