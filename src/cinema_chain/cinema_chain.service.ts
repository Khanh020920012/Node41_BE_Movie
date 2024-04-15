import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCinemaChainDto } from './dto/create-cinema_chain.dto';
import { UpdateCinemaChainDto } from './dto/update-cinema_chain.dto';
import {PrismaClient, cinema_chain} from '@prisma/client'

@Injectable()
export class CinemaChainService {

  prisma = new PrismaClient();

  async createCinemaChain(chainName: string, logo: string): Promise<any> {
    return await this.prisma.cinema_chain.create({
      data: {
        chain_name: chainName,
        logo: logo
      }
    });
  }

  async findAll(): Promise<cinema_chain[]> {
    return await this.prisma.cinema_chain.findMany();
  }

  async findOne(id: number): Promise<cinema_chain> {
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

  async update(id: number, chainName: string, logo: string): Promise<cinema_chain> {
    const checkCinemaChain = await this.prisma.cinema_chain.findFirst({
      where: {
        id: id
      }
    });
    if(!checkCinemaChain){
      throw new NotFoundException('Cinema Chain not found');
    }

    return await this.prisma.cinema_chain.update({
      where: {id: id},
      data: {
        chain_name: chainName,
        logo: logo
      }
    });
  }

  async remove(id: number): Promise<void> {
    const checkCinemaChain = await this.prisma.cinema_chain.findFirst({
      where: {
        id: id
      }
    });
    if(!checkCinemaChain){
      throw new NotFoundException('Cinema Chain not found');
    }

    await this.prisma.cinema_chain.delete({
      where: {id: id}
    })
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
}
