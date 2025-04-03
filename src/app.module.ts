import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { StickersModule } from './stickers/stickers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TradesModule } from './trades/trades.module';
import { StickerPackModule } from './sticker-pack/sticker-pack.module';
import { TasksModule } from './tasks/tasks.module';
import { UserStickersModule } from './user-stickers/user-stickers.module';
import { CoinTransactionModule } from './coin-transaction/coin-transaction.module';

@Module({
  imports: [UsersModule, StickersModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    password: 'postgres',
    port: 5432,
    username: 'postgres',
    database: 'dbgamification',
    logging: true,
    synchronize: true,
  }), TradesModule, StickerPackModule, TasksModule, UserStickersModule, CoinTransactionModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
