import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeatService } from './seat.service';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller('seat')
export class SeatController {
  constructor(private readonly seatService: SeatService) {}

  @Post('create')
  async create(
    @Body('seatName') seatName: string,
    @Body('seatType') seatType: string,
    @Body('cinemaId') cinemaId: number) {
    return await this.seatService.create(seatName, seatType, cinemaId);
  }

  @Get()
  async findAll() {
    return await this.seatService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.seatService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body('seatName') seatName: string,
    @Body('seatType') seatType: string,
    @Body('cinemaId') cinemaId: number) {
    return await this.seatService.update(+id, seatName, seatType, cinemaId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.seatService.remove(+id);
  }
}
