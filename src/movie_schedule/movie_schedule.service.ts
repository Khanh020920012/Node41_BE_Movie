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
}
