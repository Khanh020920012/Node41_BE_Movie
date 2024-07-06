import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieScheduleDto } from './dto/create-movie_schedule.dto';
import { UpdateMovieScheduleDto } from './dto/update-movie_schedule.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class MovieScheduleService {
  prisma = new PrismaClient();

  async create(cinema_id: number, movie_id: number, showing_datetime: Date, ticket_price: number)
  : Promise<any> {
    return await this.prisma.movie_schedule.create({
      data:{
        movie_id,
        showing_datetime,
        ticket_price,
        cinema_id
      }
    });
  }

  async findAll() : Promise<any[]> {
    return await this.prisma.movie_schedule.findMany();
  }

  async findOne(id: number) {
    const movie_schedule = await this.prisma.movie_schedule.findFirst({
      where: {
        id: id
      }
    });
    if (!movie_schedule){
      throw new NotFoundException('Movie Schedule not found');
    }
    return movie_schedule;
  }

  async update(id: number, cinema_id: number, movie_id: number, showing_datetime: Date, ticket_price: number) {
    const checkMovieSchedule = await this.prisma.movie_schedule.findFirst({
      where: {
        id: id
      }
    });
    if(!checkMovieSchedule){
      throw new NotFoundException('Movie Schedule not found');
    }

    return await this.prisma.movie_schedule.update({
      where: {id: id},
      data: {
        movie_id,
        showing_datetime,
        ticket_price,
        cinema_id
      }
    });
  }

  async remove(id: number) {
    const checkMovieSchedule = await this.prisma.movie_schedule.findFirst({
      where: {
        id: id
      }
    });
    if(!checkMovieSchedule){
      throw new NotFoundException('Movie Schedule not found');
    }

    await this.prisma.movie_schedule.delete({
      where: {id: id}
    })
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
}
//