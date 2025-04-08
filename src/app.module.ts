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
import { FriendsRelationshipModule } from './friends-relationship/friends-relationship.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, StickersModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'dbgamification',
    migrationsRun: true,
    autoLoadEntities: true,
    migrationsTableName: 'migrations',
    synchronize: true,
    logging: true,
    entities: [__dirname + '/**/*.entity.js']
  }), TradesModule, StickerPackModule, TasksModule, UserStickersModule, CoinTransactionModule, FriendsRelationshipModule, AuthModule, ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
