import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as express from 'express';
import { ValidationPipe } from '@nestjs/common';
import { StickersService } from './stickers/stickers.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
  app.use('/sticker-images', express.static(join(__dirname, '..', 'uploads', 'stickers')));

  const stickersService = app.get(StickersService);
  await stickersService.seedStickers();

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`🚀 Server running at http://localhost:${port}`);
}
bootstrap();
