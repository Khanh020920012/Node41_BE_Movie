import { HttpException, HttpStatus, Injectable, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { CreateMovieBookingDto } from './dto/create-movie_booking.dto';
import { UpdateMovieBookingDto } from './dto/update-movie_booking.dto';
import { PrismaClient } from '@prisma/client';
import { Request } from 'express';
import { JwtPayload } from 'src/auth/jwt-payload';

@Injectable()
export class MovieBookingService {

  prisma = new PrismaClient();

  async create(req: Request, schedule_id: number, list_seats: any[]) {
    let successCount = 0;
    const tokenData = req.user as JwtPayload;
    for(let seat of list_seats){
      let checkSeatAvailable = await this.checkSeatAvailable(schedule_id, seat.seat_id);
      if(checkSeatAvailable){
        let booking = await this.prisma.movie_booking.create({
          data: {
            user_id: tokenData.id,
            schedule_id,
            seat: seat.seat_id
          }
        });
        if(booking)
          successCount++;
      }
    }
    
    if(successCount != list_seats.length)
      throw new ServiceUnavailableException(`Cannot create booking. Seat already taken`);
    return {"message": "Booking success"};
  }

  async checkSeatAvailable(schedule_id: number, seat_id: number){
    let checkSeat = await this.prisma.movie_booking.findFirst({
      where: {
        schedule_id,
        seat: seat_id
      }
    });
    return checkSeat == null;
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
//