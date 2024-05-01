import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MovieScheduleService } from './movie_schedule.service';
import { CreateMovieScheduleDto } from './dto/create-movie_schedule.dto';
import { UpdateMovieScheduleDto } from './dto/update-movie_schedule.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller('movie-schedule')
export class MovieScheduleController {
  constructor(private readonly movieScheduleService: MovieScheduleService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  async create(
    @Body('movie_id') movie_id: number,
    @Body('showing_datetime') showing_datetime: Date,
    @Body('ticket_price') ticket_price: number,
    @Body('cinema_id') cinema_id: number, ) {
    return await this.movieScheduleService.create(cinema_id, movie_id, showing_datetime, ticket_price);
  }

  @Get()
  async findAll() {
    return this.movieScheduleService.findAll();
  }

  @Get()
  async findOne(@Param('id') id: string) {
    return await this.movieScheduleService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body('movie_id') movie_id: number,
    @Body('showing_datetime') showing_datetime: Date,
    @Body('ticket_price') ticket_price: number,
    @Body('cinema_id') cinema_id: number,) {
    return this.movieScheduleService.update(+id, cinema_id, movie_id, showing_datetime, ticket_price);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.movieScheduleService.remove(+id);
  }

  @Get('available-seats')
  async getAvailableSeats(
    @Body('scheduleId') scheduleId: number
  ){
    return await this.movieScheduleService.getAvailableSeatForMovieSchedule(scheduleId);
  }

  @Get('movie-schedule-by-movie-id/:movie_id')
  async getMovieSchedulesByMovieId(
    @Param('movie_id') movie_id: number
  ){
    return await this.movieScheduleService.getMovieScheduleFromMovieId(+movie_id);
  }
}
