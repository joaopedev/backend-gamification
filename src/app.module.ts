import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { StickersModule } from './stickers/stickers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TradesModule } from './trades/trades.module';
import { StickerPackModule } from './sticker-pack/sticker-pack.module';
import { UserStickersModule } from './user-stickers/user-stickers.module';
import { CoinTransactionModule } from './coin-transaction/coin-transaction.module';
import { FriendsRelationshipModule } from './friends-relationship/friends-relationship.module';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { join } from 'path';
import { CustomMailService } from './mail/mail.service';
import { FileModule } from './file.module';


@Module({
  imports: [UsersModule, StickersModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'dbgamification',
    migrationsRun: true,
    autoLoadEntities: true,
    migrationsTableName: 'migrations',
    synchronize: true,
    logging: true,
    entities: [__dirname + '/**/*.entity.js']
  }), MailerModule.forRoot({
    transport: {
      host: 'smtp.gmail.com', // ou o SMTP do seu provedor
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER ,
        pass: process.env.EMAIL_PASS,
      },
    },
    defaults: {
      from: '"Gammification" <gammification@gmail.com>',
    },
    template: {
      dir: join(__dirname, 'templates'), // opcional, para templates com handlebars
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true,
      },
    },
  }), TradesModule, StickerPackModule, UserStickersModule, CoinTransactionModule, FriendsRelationshipModule, AuthModule, FileModule, ],
  controllers: [AppController],
  providers: [AppService, CustomMailService],
})
export class AppModule {}
