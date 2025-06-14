"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./users/users.module");
const stickers_module_1 = require("./stickers/stickers.module");
const typeorm_1 = require("@nestjs/typeorm");
const trades_module_1 = require("./trades/trades.module");
const sticker_pack_module_1 = require("./sticker-pack/sticker-pack.module");
const user_stickers_module_1 = require("./user-stickers/user-stickers.module");
const coin_transaction_module_1 = require("./coin-transaction/coin-transaction.module");
const friends_relationship_module_1 = require("./friends-relationship/friends-relationship.module");
const auth_module_1 = require("./auth/auth.module");
const mailer_1 = require("@nestjs-modules/mailer");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const file_module_1 = require("./file.module");
const config_1 = require("@nestjs/config");
const completed_pages_module_1 = require("./completed-pages/completed-pages.module");
const album_module_1 = require("./album/album.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
                ignoreEnvFile: false,
            }),
            users_module_1.UsersModule,
            stickers_module_1.StickersModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.DATABASE_HOST,
                port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT) : 5432,
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
                }
            }),
            mailer_1.MailerModule.forRoot({
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
                    from: '"Gammification" <gammification@gmail.com>',
                },
                template: {
                    dir: __dirname + '/templates',
                    adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                    options: {
                        strict: true,
                    },
                },
            }),
            trades_module_1.TradesModule,
            sticker_pack_module_1.StickerPackModule,
            user_stickers_module_1.UserStickersModule,
            coin_transaction_module_1.CoinTransactionModule,
            friends_relationship_module_1.FriendsRelationshipModule,
            auth_module_1.AuthModule,
            file_module_1.FileModule,
            completed_pages_module_1.CompletedPagesModule,
            album_module_1.AlbumModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map