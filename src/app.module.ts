import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { StickersModule } from './stickers/stickers.module';

@Module({
  imports: [UsersModule, StickersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
