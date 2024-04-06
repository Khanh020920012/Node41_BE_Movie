import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class SeatService {

  prisma = new PrismaClient();

  async create(seatName: string, seatType: string, cinemaId: number): Promise<any> {
    return await this.prisma.seat.create({
      data: {
        seat_name: seatName,
        seat_type: seatType,
        cinema_id: cinemaId
      }
    });
  }

  async findAll(): Promise<any[]> {
    return await this.prisma.seat.findMany({
      include: {
        cinema: true
      }
    });
  }

  async findOne(id: number): Promise<any> {
    const seat = await this.prisma.seat.findFirst({
      where: {
        id
      },
      include: {
        cinema: true
      }
    });

    if(!seat){
      throw new NotFoundException('Seat Not Found');
    }
    return seat;
  }

  async update(id: number, seatName: string, seatType: string, cinemaId: number): Promise<any> {
    const seat = await this.prisma.seat.findFirst({
      where: {
        id
      }
    });

    if(!seat){
      throw new NotFoundException('Seat Not Found');
    }

    return await this.prisma.seat.update({
      where: {id},
      data: {
        seat_name: seatName,
        seat_type: seatType,
        cinema_id: cinemaId
      }
    });
  }

  async remove(id: number): Promise<void> {
    const seat = await this.prisma.seat.findFirst({
      where: {
        id
      }
    });

    if(!seat){
      throw new NotFoundException('Seat Not Found');
    }
    
    await this.prisma.seat.delete({
      where: {id}
    })
  }
}
