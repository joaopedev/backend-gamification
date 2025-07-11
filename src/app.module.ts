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
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { FileModule } from './file.module';
import { ConfigModule } from '@nestjs/config';
import { CompletedPagesModule } from './completed-pages/completed-pages.module';
import { AlbumModule } from './album/album.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      ignoreEnvFile: false,
    }),
    UsersModule,
    StickersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT
        ? parseInt(process.env.DATABASE_PORT)
        : 5432,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD?.toString(),
      database: process.env.DATABASE_NAME,
      migrationsRun: true,
      autoLoadEntities: true,
      migrationsTableName: 'migrations',
      synchronize: true,
      logging: true,
      entities: [__dirname + '/**/*.entity.js'],
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      },
      defaults: {
        from: '"Converge que cola" <convergequecola@gmail.com>',
      },
      template: {
        dir: join(process.cwd(), 'dist', 'mail', 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    TradesModule,
    StickerPackModule,
    UserStickersModule,
    CoinTransactionModule,
    FriendsRelationshipModule,
    AuthModule,
    FileModule,
    CompletedPagesModule,
    AlbumModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
