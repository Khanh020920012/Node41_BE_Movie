import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieBookingDto } from './dto/create-movie_booking.dto';
import { UpdateMovieBookingDto } from './dto/update-movie_booking.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class MovieBookingService {

  prisma = new PrismaClient();

  async create(user_id: number, schedule_id: number, seat: number) {
    let checkBooking = await this.prisma.movie_booking.findFirst({
      where:{
        schedule_id,
        seat,
      }
    })
    if (checkBooking){
      throw new HttpException('Seat already Taken!', HttpStatus.BAD_REQUEST);
    }
    let responseData = await this.prisma.movie_booking.create({
      data: {
        user_id,
        schedule_id,
        seat
      }
    });
    return {message: 'Create Booking Success', responseData};
  }

  async findAll() {
    return await this.prisma.movie_booking.findMany();
  }

  async findOne(id: number) {
    const booking = await this.prisma.movie_booking.findFirst({
      where: {
        id: id
      }
    });
    if (!booking){
      throw new NotFoundException('Movie Booking not found');
    }
    return booking;
  }

  async update(id: number, user_id: number, schedule_id: number, seat: number) {
    const booking = await this.prisma.movie_booking.findFirst({
      where: {
        id: id
      }
    });
    if (!booking){
      throw new NotFoundException('Movie Booking not found');
    }
    return await this.prisma.movie_booking.update({
      where: {id},
      data: {
        user_id,
        schedule_id,
        seat
      }
    });
  }

  async remove(id: number) {
    const booking = await this.prisma.movie_booking.findFirst({
      where: {
        id: id
      }
    });
    if (!booking){
      throw new NotFoundException('Movie Booking not found');
    }
    return await this.prisma.movie_booking.delete({
      where: {id}
    });
  }
}
