import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TradesService } from './trades.service';
import { CreateTradeDTO } from './dto/create-trade.dto';
import { UpdateTradeDto } from './dto/update-trade.dto';

@Controller('trades')
export class TradesController {
  constructor(private readonly tradesService: TradesService) {}

  @Post()
  create(@Body() createTradeDto: CreateTradeDTO) {
    return this.tradesService.create(createTradeDto);
  }

  @Get()
  findAll() {
    return this.tradesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tradesService.findOne(+id);
  }

  @Get('user/:userId')
  findAllTradesByUserId(@Param('userId') userId: string) {
    return this.tradesService.findAllTradesByUserId(+userId);
  }

  @Get('user/:userId/received')
  findAllReceivedTradesByUserId(@Param('userId') userId: string) {
    return this.tradesService.findAllReceivedTradesByUserId(+userId);
  }

  @Get('user/:userId/history')
  findTradeHistoryByUserId(@Param('userId') userId: string) {
    return this.tradesService.findTradeHistoryByUserId(+userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTradeDto: UpdateTradeDto) {
    return this.tradesService.update(+id, updateTradeDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.tradesService.remove(+id);
  // }
}
