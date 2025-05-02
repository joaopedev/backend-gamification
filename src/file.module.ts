import { Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import { Filescontroller } from "./file.controller";

@Module({
  imports: [ 
    MulterModule.register({
      dest: "./uploads/stickers",
    }),
  ],
  controllers: [Filescontroller],
})

export class FileModule {}