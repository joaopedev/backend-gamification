import { PartialType } from '@nestjs/mapped-types';
import { CreateAlbumDto } from './create-albun.dto';

export class UpdateAlbunDto extends PartialType(CreateAlbumDto) {}
