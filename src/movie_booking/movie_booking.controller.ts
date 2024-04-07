import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MovieBookingService } from './movie_booking.service';
import { CreateMovieBookingDto } from './dto/create-movie_booking.dto';
import { UpdateMovieBookingDto } from './dto/update-movie_booking.dto';

@Controller('movie-booking')
export class MovieBookingController {
  constructor(private readonly movieBookingService: MovieBookingService) {}

  @Post('create')
  async create(
    @Body('user_id') user_id: number,
    @Body('schedule_id') schedule_id: number,
    @Body('seat') seat: number,) {
    return await this.movieBookingService.create(user_id, schedule_id, seat);
  }

  @Get()
  async findAll() {
    return await this.movieBookingService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.movieBookingService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body('user_id') user_id: number,
    @Body('schedule_id') schedule_id: number,
    @Body('seat') seat: number,) {
    return this.movieBookingService.update(+id, user_id, schedule_id, seat);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.movieBookingService.remove(+id);
  }
}
