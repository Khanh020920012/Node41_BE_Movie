import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CinemaService } from './cinema.service';
import { CreateCinemaDto } from './dto/create-cinema.dto';
import { UpdateCinemaDto } from './dto/update-cinema.dto';

@Controller('cinema')
export class CinemaController {
  constructor(private readonly cinemaService: CinemaService) {}

  @Post('create')
  async create(
    @Body('cinemaName') cinemaName: string,
    @Body('groupId') groupId: number 
    ) {
    return await this.cinemaService.create(cinemaName, groupId);
  }

  @Get()
  async findAll() {
    return await this.cinemaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.cinemaService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body('cinemaName') cinemaName: string,
    @Body('groupId') groupId: number ) {
    return this.cinemaService.update(+id, cinemaName, groupId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.cinemaService.remove(+id);
  }
}
