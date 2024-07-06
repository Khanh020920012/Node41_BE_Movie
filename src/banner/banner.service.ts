import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class BannerService {

  prisma = new PrismaClient();

  async create(movie_id: number, banner_image: string) {
    return await this.prisma.banner.create({
      data: {
        movie_id,
        banner_image
      }
    });
  }

  async findAll() {
    return await this.prisma.banner.findMany();
  }

  async findOne(id: number) {
    const banner = await this.prisma.banner.findFirst({
      where: {
        id: id
      }
    });
    if (!banner){
      throw new NotFoundException('Banner not found');
    }
    return banner;
  }

  async update(id: number, movie_id: number, banner_image: string) {
    const checkBanner = await this.prisma.banner.findFirst({
      where: {
        id: id
      }
    });
    if(!checkBanner){
      throw new NotFoundException('Banner not found');
    }

    return await this.prisma.banner.update({
      where: {id: id},
      data: {
        movie_id,
        banner_image
      }
    });
  }

  async remove(id: number) {
    const checkBanner = await this.prisma.banner.findFirst({
      where: {
        id: id
      }
    });
    if(!checkBanner){
      throw new NotFoundException('Banner not found');
    }

    await this.prisma.banner.delete({
      where: {id: id}
    });
  }
}
//