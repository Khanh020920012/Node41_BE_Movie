import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CinemaGroupService } from './cinema_group.service';
import { CreateCinemaGroupDto } from './dto/create-cinema_group.dto';
import { UpdateCinemaGroupDto } from './dto/update-cinema_group.dto';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller('cinema-group')
export class CinemaGroupController {
  constructor(private readonly cinemaGroupService: CinemaGroupService) {}

  @Post('create')
  async create(
    @Body('groupName') groupName: string, 
    @Body('address') address: string,
    @Body('chainId') chainId: number
    ) {
    return await this.cinemaGroupService.create(groupName, address, chainId);
  }

  @Get()
  async findAll() {
    return await this.cinemaGroupService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.cinemaGroupService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body('groupName') groupName: string, 
    @Body('address') address: string,
    @Body('chainId') chainId: number) {
    return await this.cinemaGroupService.update(+id, groupName, address, chainId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.cinemaGroupService.remove(+id);
  }
}
