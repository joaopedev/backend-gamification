"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StickersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const sticker_entity_1 = require("./entities/sticker.entity");
const fs_1 = require("fs");
const fs = require("fs");
const path_1 = require("path");
let StickersService = class StickersService {
    stickerRepo;
    constructor(stickerRepo) {
        this.stickerRepo = stickerRepo;
    }
    async seedStickers() {
        const stickersDir = (0, path_1.join)(__dirname, '..', '..', 'uploads', 'stickers');
        const files = fs.readdirSync(stickersDir);
        for (const file of files) {
            const name = file.split('.')[0];
            const exists = await this.stickerRepo.findOne({ where: { name } });
            if (exists)
                continue;
            const newSticker = this.stickerRepo.create({
                name,
                sponsor: 'default sponsor',
                description: 'default description',
                category: 'default category',
                section: 'default area',
                sub_category: 'default sub-category',
                image_url: `http://localhost:3000/sticker-images/${file}`,
            });
            await this.stickerRepo.save(newSticker);
        }
        console.log('✅ Stickers populados automaticamente.');
    }
    async populateFromExistingImages() {
        const stickersDir = (0, path_1.join)(__dirname, '..', '..', 'uploads', 'stickers');
        const files = (0, fs_1.readdirSync)(stickersDir);
        for (const file of files) {
            const imageUrl = `http://localhost:3000/sticker-images/${file}`;
            const name = file.split('.')[0];
            const existing = await this.stickerRepo.findOne({
                where: [{ image_url: imageUrl }, { name: name }],
            });
            if (existing) {
                console.log(`Sticker "${name}" already exists. Skipping.`);
                continue;
            }
            const newSticker = this.stickerRepo.create({
                name,
                sponsor: 'Padrão',
                description: 'Figurinha automática',
                category: 'Geral',
                section: 'Desconhecida',
                image_url: imageUrl,
            });
            await this.stickerRepo.save(newSticker);
        }
        return { message: 'Importação concluída' };
    }
    async create(createStickerDto, file) {
        const { name, sponsor, description, category, section } = createStickerDto;
        const filePath = (0, path_1.join)(__dirname, '..', '..', 'uploads', 'stickers', file.filename);
        if (!fs.existsSync(filePath)) {
            throw new common_1.BadRequestException('File not found');
        }
        const fileSize = fs.statSync(filePath).size / 1024 / 1024;
        if (fileSize > 5) {
            fs.unlinkSync(filePath);
            throw new common_1.BadRequestException('File size exceeds 5MB limit');
        }
        const newSticker = this.stickerRepo.create({
            name,
            sponsor,
            description,
            category,
            section,
            image_url: `http://localhost:3000/sticker-images/${file.filename}`,
        });
        return this.stickerRepo.save(newSticker);
    }
    findAll() {
        return this.stickerRepo.find();
    }
    findOne(id) {
        return this.stickerRepo.findOne({ where: { id } });
    }
    async update(id, updateStickerDto) {
        await this.stickerRepo.update(id, updateStickerDto);
        return this.stickerRepo.findOne({ where: { id } });
    }
    async remove(id) {
        const sticker = await this.stickerRepo.findOne({ where: { id } });
        if (!sticker)
            throw new common_1.NotFoundException('Sticker not found');
        await this.stickerRepo.delete(id);
        return { message: 'Sticker deleted' };
    }
};
exports.StickersService = StickersService;
exports.StickersService = StickersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(sticker_entity_1.Sticker)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], StickersService);
//# sourceMappingURL=stickers.service.js.map