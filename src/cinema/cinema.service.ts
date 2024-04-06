import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateCinemaDto } from './dto/create-cinema.dto';
import { UpdateCinemaDto } from './dto/update-cinema.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class CinemaService {
  prisma = new PrismaClient();

  async create(cinemaName: string, groupId: number): Promise<any> {
    return await this.prisma.cinema.create({
      data: {
        cinema_name: cinemaName,
        cinema_group_id: groupId
      }
    });
  }

  async findAll(): Promise<any[]> {
    return await this.prisma.cinema.findMany({
      include:{
        cinema_group: true
      }
    });
  }

  async findOne(id: number): Promise<any> {
    const cinema = await this.prisma.cinema.findFirst({
      where: {
        id
      },
      include: {
        cinema_group: true
      }
    });

    if(!cinema){
      throw new NotFoundException('Cinema Not Found');
    }
    return cinema;
  }

  async update(id: number, cinemaName: string, groupId: number): Promise<any> {
    const cinema = await this.prisma.cinema.findFirst({
      where: {
        id
      }
    });

    if(!cinema){
      throw new NotFoundException('Cinema Not Found');
    }

    return this.prisma.cinema.update({
      where: {id},
      data: {
        cinema_name: cinemaName,
        cinema_group_id: groupId
      }
    });
  }

  async remove(id: number) {
    const cinema = await this.prisma.cinema.findFirst({
      where: {
        id
      }
    });

    if(!cinema){
      throw new NotFoundException('Cinema Not Found');
    }

    await this.prisma.cinema.delete({
      where: {id}
    });
  }
}
