import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MovieService } from './movie.service';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post('create')
  async create(
    @Body('name') name: string,
    @Body('trailer') trailer: string,
    @Body('image') image: string,
    @Body('description') description: string,
    @Body('premiere_day') premiere_day: Date,
    @Body('rating') rating: number,
    @Body('hot') hot: boolean,
    @Body('showing') showing: boolean,
    @Body('showing_soon') showing_soon: boolean,
    ) {
    return await this.movieService.create(name, trailer, image,
      description, premiere_day, rating, hot, showing, showing_soon);
  }

  @Get()
  async findAll() {
    return await this.movieService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.movieService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body('name') name: string,
    @Body('trailer') trailer: string,
    @Body('image') image: string,
    @Body('description') description: string,
    @Body('premiere_day') premiere_day: Date,
    @Body('rating') rating: number,
    @Body('hot') hot: boolean,
    @Body('showing') showing: boolean,
    @Body('showing_soon') showing_soon: boolean) {
    return await this.movieService.update(+id, name, trailer, image,
      description, premiere_day, rating, hot, showing, showing_soon);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.movieService.remove(+id);
  }
}
