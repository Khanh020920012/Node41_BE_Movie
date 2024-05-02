import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/jwt-payload';
import * as bcrypt from 'bcrypt';

@Injectable()
export class QuanLyRapService {
  constructor() {}
  prisma = new PrismaClient();

  async findOne(id: number): Promise<any> {
    const cinemaChain = await this.prisma.cinema_chain.findFirst({
      where: {
        id: id
      }
    });
    if (!cinemaChain){
      throw new NotFoundException('Cinema Chain not found');
    }
    return cinemaChain;
  }

  async getCinemaGroupInChain(id: number){
    const checkCinemaChain = await this.prisma.cinema_chain.findFirst({
      where: {
        id: id
      }
    });
    if(!checkCinemaChain){
      throw new NotFoundException('Cinema Chain not found');
    };

    let cinemaGroup = await this.prisma.cinema_group.findMany({
      where: {
        cinema_chain_id: id
      }
    });

    if(!cinemaGroup){
      throw new NotFoundException('No Cinema Group in Chain not found');
    }
    return cinemaGroup;
  }

  async getMovieScheduleForChain(chain_id: number, movie_id: number) {
    let movie_schedules = await this.prisma.movie_schedule.findMany({
      where: {
        movie_id: movie_id,
        cinema: {
          cinema_group: {
            cinema_chain_id: chain_id
          }
        }
      },
      include: {
        cinema: true,
        movie: true
      }
    });
    return movie_schedules;
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
