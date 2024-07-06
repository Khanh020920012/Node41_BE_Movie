import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CinemaChainService } from './cinema_chain.service';
import { CreateCinemaChainDto } from './dto/create-cinema_chain.dto';
import { UpdateCinemaChainDto } from './dto/update-cinema_chain.dto';
import { cinema_chain } from '@prisma/client';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller('cinema-chain')
export class CinemaChainController {
  constructor(private readonly cinemaChainService: CinemaChainService) {}

  @Post('create')
  async createCinemaChain(
    @Body('chainName') chainName: string,
    @Body('logo') logo: string
  ) {
    return await this.cinemaChainService.createCinemaChain(chainName, logo)
  }

  @Get()
  async findAll() {
    return await this.cinemaChainService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.cinemaChainService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body('chainName') chainName: string,
    @Body('logo') logo: string) {
    return await this.cinemaChainService.update(+id, chainName, logo);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.cinemaChainService.remove(+id);
  }

  @Get('movie-group-in-chain/:id')
  async getMovieGroupInChain(
    @Param('id') id: number
  ){
    return await this.cinemaChainService.getCinemaGroupInChain(+id);
  }

  @Get('movie-schedules-for-chain/:chain_id/:movie_id')
  async getMovieScheduleForChain(
    @Param('chain_id') chain_id: number,
    @Param('movie_id') movie_id: number
  ){
    return await this.cinemaChainService.getMovieScheduleForChain(+chain_id, +movie_id);
  }
}
//