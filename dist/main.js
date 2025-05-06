"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const path_1 = require("path");
const express = require("express");
const common_1 = require("@nestjs/common");
const stickers_service_1 = require("./stickers/stickers.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
    app.use('/sticker-images', express.static((0, path_1.join)(__dirname, '..', 'uploads', 'stickers')));
    const stickersService = app.get(stickers_service_1.StickersService);
    await stickersService.seedStickers();
    const port = process.env.PORT ?? 3000;
    await app.listen(port);
    console.log(`🚀 Server running at http://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map