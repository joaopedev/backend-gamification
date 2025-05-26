import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CompletePageDto } from './dto/create-completed-page.dto';
import { UpdateCompletedPageDto } from './dto/update-completed-page.dto';
import { CompletedPagesService } from './completed-pages.service';

@Controller('completed-pages')
export class CompletedPagesController {
  constructor(private readonly completedPagesService: CompletedPagesService) {}

  // Ajuste da rota para incluir userId como parâmetro
  @Post()
  async completePage(@Body() dto: CompletePageDto) {
    const result = await this.completedPagesService.create(dto.userId, dto);
    return {
      ticket: result.ticket,
      message: 'Página completada com sucesso',};
  }

  @Get()
  findAll() {
    return this.completedPagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.completedPagesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCompletedPageDto: UpdateCompletedPageDto,
  ) {
    return this.completedPagesService.update(+id, updateCompletedPageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.completedPagesService.remove(+id);
  }
}
