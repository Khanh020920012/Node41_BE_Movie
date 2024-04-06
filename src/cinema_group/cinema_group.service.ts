import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateCinemaGroupDto } from './dto/create-cinema_group.dto';
import { UpdateCinemaGroupDto } from './dto/update-cinema_group.dto';
import {PrismaClient, cinema_group} from '@prisma/client';
import { ResponseService } from 'src/utils/response.service';

@Injectable()
export class CinemaGroupService {
  constructor(private responseService: ResponseService) {}
  prisma = new PrismaClient();

  async create(groupName: string, address: string, chainId: number) {
    let checkCinemaChain = await this.prisma.cinema_chain.findFirst({
      where: {
        id: chainId
      }
    });

    if(!checkCinemaChain){
      throw new BadRequestException("Not found Cinema Chain");
    }

    return await this.prisma.cinema_group.create({
      data: {
        group_name: groupName,
        address,
        cinema_chain_id: chainId
      }
    });
  }

  async findAll() {
    return await this.prisma.cinema_group.findMany(
     {
      include: {
        cinema_chain: true
      }
     } 
    );
  }

  async findOne(id: number) {
    const cinemaGroup = await this.prisma.cinema_group.findFirst({
      where: {
        id: id
      },
      include: {
        cinema_chain: true
      }
    });
    if (!cinemaGroup){
      throw new NotFoundException("Not found cinema group");
    }
    return cinemaGroup;
  }

  async update(id: number, groupName: string, address: string, chainId: number) {
    const checkCinemaGroup = await this.prisma.cinema_group.findFirst({
      where: {
        id: id
      }
    });
    if(!checkCinemaGroup){
      throw new NotFoundException("Not found cinema group");
    }

    return await this.prisma.cinema_group.update({
      where: {id: id},
      data: {
        group_name: groupName,
        address,
        cinema_chain_id: chainId
      }
    })
  }

  async remove(id: number) {
    const checkCinemaGroup = await this.prisma.cinema_group.findFirst({
      where: {
        id: id
      }
    });
    if(!checkCinemaGroup){
      throw new NotFoundException("Not found cinema group");
    }

    return await this.prisma.cinema_group.delete({
      where: {id: id}
    })
  }
}
