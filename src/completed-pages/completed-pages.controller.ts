import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CompletePageDto } from './dto/create-completed-page.dto';
import { UpdateCompletedPageDto } from './dto/update-completed-page.dto';
import { CompletedPagesService } from './completed-pages.service';


@Controller('completed-pages')
export class CompletedPagesController {
  constructor(private readonly completedPagesService: CompletedPagesService) {}

  // Ajuste da rota para incluir userId como parâmetro
  @Post(':userId')
  async completePage(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() dto: CompletePageDto
  ) {
    return this.completedPagesService.create(userId, dto);
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
  update(@Param('id') id: string, @Body() updateCompletedPageDto: UpdateCompletedPageDto) {
    return this.completedPagesService.update(+id, updateCompletedPageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.completedPagesService.remove(+id);
  }
}