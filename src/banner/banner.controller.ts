import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BannerService } from './banner.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller('banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Post('create')
  async create(
    @Body('movie_id') movie_id: number,
    @Body('banner_image') banner_image: string) {
    return this.bannerService.create(movie_id, banner_image);
  }

  @Get()
  async findAll() {
    return await this.bannerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.bannerService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body('movie_id') movie_id: number,
    @Body('banner_image') banner_image: string) {
    return await this.bannerService.update(+id, movie_id, banner_image);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.bannerService.remove(+id);
  }
}
