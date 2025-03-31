import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { StickersModule } from './stickers/stickers.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [UsersModule, StickersModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    password: 'postgres',
    port: 5432,
    username: 'postgres',
    database: 'dbgamification',
  }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
