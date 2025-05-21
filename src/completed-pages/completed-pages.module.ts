import { Module } from '@nestjs/common';
import { CompletedPagesService } from './completed-pages.service';
import { CompletedPagesController } from './completed-pages.controller';
import { CompletedPage } from './entities/completed-page.entity';
import { Users } from 'src/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist';

@Module({
  imports: [TypeOrmModule.forFeature([CompletedPage, Users])],
  controllers: [CompletedPagesController],
  providers: [CompletedPagesService],
})
export class CompletedPagesModule {}
