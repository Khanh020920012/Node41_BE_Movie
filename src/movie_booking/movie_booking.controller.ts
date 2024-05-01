import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { MovieBookingService } from './movie_booking.service';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller('movie-booking')
export class MovieBookingController {
  constructor(private readonly movieBookingService: MovieBookingService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  async create(
    @Req() req: Request,
    @Body('schedule_id') schedule_id: number,
    @Body('list_seats') list_seats: any[],) {
    return await this.movieBookingService.create(req, schedule_id, list_seats);
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
