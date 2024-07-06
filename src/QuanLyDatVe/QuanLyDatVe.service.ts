import { Injectable, NotFoundException, ServiceUnavailableException, UnauthorizedException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Request } from 'express';
import { JwtPayload } from 'src/auth/jwt-payload';

@Injectable()
export class QuanLyDatVeService {
  prisma = new PrismaClient();

  async createMovieSchedule(req: Request, cinema_id: number, movie_id: number, showing_datetime: string, ticket_price: number)
  : Promise<any> {
    const tokenData = req.user as JwtPayload;
    if(tokenData.user_type != "ADMIN")
        throw new UnauthorizedException('NOT AUTHORIZE TO DO THIS ACTION');
    return await this.prisma.movie_schedule.create({
      data:{
        movie_id,
        showing_datetime: new Date(showing_datetime),
        ticket_price,
        cinema_id
      }
    });
  }

  async getAvailableSeatForMovieSchedule(scheduleId: number){
    const movieSchedule = await this.prisma.movie_schedule.findFirst({
      where:{
        id: scheduleId
      }
    });

    if(!movieSchedule){
      throw new NotFoundException(`Not found movie schedule ID: ${scheduleId}`);
    }

    const allSeat = await this.prisma.seat.findMany({
      where: {
        cinema_id: movieSchedule.cinema_id
      }
    });

    if(!allSeat){
      throw new NotFoundException(`Not found seat for cinema: ${movieSchedule.cinema_id}`);
    }

    const movieBookingForSchedule = await this.prisma.movie_booking.findMany({
      where: {
        schedule_id: scheduleId
      }
    });

    if(!movieBookingForSchedule){
      throw new NotFoundException(`Not found movie booking for schedule: ${scheduleId}`);
    }

    const bookedSeatsMap = movieBookingForSchedule.map(booking => booking.seat);
    const availableSeats = allSeat.filter(seat => !bookedSeatsMap.includes(seat.id));

    return{
      availableSeats,
      scheduleId
    }
  }

  async getMovieScheduleFromMovieId(movie_id: number){
    return await this.prisma.movie_schedule.findMany({
      where: {
        movie_id
      },
      include: {
        movie: true,
        cinema: true
      }
    });
  }

  async createMovieBooking(req: Request, schedule_id: number, list_seats: any[]) {
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
}
//