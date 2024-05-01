import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UseGuards, Req } from '@nestjs/common';
import { MovieService } from './movie.service';
import { FileInterceptor } from '@nestjs/platform-express';
import {diskStorage} from 'multer';
import { readFileSync } from 'fs';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Math.floor(Date.now() / 1000) + '-' + Math.round(Math.random() * 50);
        const extension = file.originalname.split('.').pop();
        const filename = file.fieldname + '-' + uniqueSuffix + '.' + extension;
        cb(null, filename);
      }
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
  }))
  async create(
    @Body('name') name: string,
    @Body('trailer') trailer: string,
    @UploadedFile() file: Express.Multer.File,
    @Body('description') description: string,
    @Body('premiere_day') premiere_day: Date,
    @Body('rating') rating: string,
    @Body('hot') hot: string,
    @Body('showing') showing: string,
    @Body('showing_soon') showing_soon: string,
    ) {
    const image = file.filename;
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

  @UseGuards(JwtAuthGuard)
  @Post('update')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Math.floor(Date.now() / 1000) + '-' + Math.round(Math.random() * 50);
        const extension = file.originalname.split('.').pop();
        const filename = file.fieldname + '-' + uniqueSuffix + '.' + extension;
        cb(null, filename);
      }
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
  }))
  async update(
    @Body('id') id: string, 
    @Body('name') name: string,
    @Body('trailer') trailer: string,
    @UploadedFile() file: Express.Multer.File,
    @Body('description') description: string,
    @Body('premiere_day') premiere_day: Date,
    @Body('rating') rating: string,
    @Body('hot') hot: string,
    @Body('showing') showing: string,
    @Body('showing_soon') showing_soon: string) {
    const image = file.filename;
    return await this.movieService.update(id, name, trailer, image,
      description, premiere_day, rating, hot, showing, showing_soon);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(
    @Req() req: Request,
    @Param('id') id: string
  ) {
    return await this.movieService.remove(+id, req);
  }

  @Get('get-movie-with-name/:name')
  async getMovieWithName(
    @Param('name') name: string
  ){
    return await this.movieService.getMoviesWithName(name);
  }

  @Get('get-movie-with-name-paging/:name/:page/:pageSize')
  async getMovieWithNamePagin(
    @Param('name') name: string,
    @Param('page') page: number,
    @Param('pageSize') pageSize: number
  ){
    return await this.movieService.getMoviesWithNamePaging(name, +page, +pageSize);
  }

  @Get('get-movie-in-range/:fromDate/:toDate/:page/:pageSize')
  async getMovieInRange(
    @Param('fromDate') fromDate: string,
    @Param('toDate') toDate: string,
    @Param('page') page: number,
    @Param('pageSize') pageSize: number
  ){
    const fromDateTime = new Date(fromDate);
    const toDateTime = new Date(toDate);
    return await this.movieService.getMoviesInRange(fromDateTime, toDateTime, +page, +pageSize);
  }
}
