import { PartialType } from '@nestjs/mapped-types';
import { CompletePageDto } from './create-completed-page.dto';

export class UpdateCompletedPageDto extends PartialType(CompletePageDto) {}
