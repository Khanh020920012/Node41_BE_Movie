import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class MovieService {

  prisma = new PrismaClient();

  async create(name: string, trailer: string, image: string, description: string
    , premiere_day: Date, rating: string, hot: string, showing: string,
    showing_soon: string) : Promise<any>{
    let parseRating = parseInt(rating);  
    return await this.prisma.movie.create({
      data: {
        movie_name: name,
        trailer,
        image,
        description,
        premiere_day,
        rating: parseRating,
        hot: hot == "true",
        showing: showing == "true",
        showing_soon: showing_soon == "true"
      }
    });
  }

  async findAll(): Promise<any[]> {
    return await this.prisma.movie.findMany();
  }

  async findOne(id: number): Promise<any> {
    const movie = await this.prisma.movie.findFirst({
      where: {
        id: id
      }
    });
    if (!movie){
      throw new NotFoundException('Cinema Chain not found');
    }
    return movie;
  }

  async update(id: number, name: string, trailer: string, image: string, description: string
    , premiere_day: Date, rating: number, hot: boolean, showing: boolean,
    showing_soon: boolean) : Promise<any> {
    const checkMovie = await this.prisma.movie.findFirst({
      where: {
        id: id
      }
    });
    if(!checkMovie){
      throw new NotFoundException('Movie not found');
    }

    return await this.prisma.movie.update({
      where: {id: id},
      data: {
        movie_name: name,
        trailer,
        image,
        description,
        premiere_day,
        rating,
        hot,
        showing,
        showing_soon
      }
    });
  }

  async remove(id: number) : Promise<void> {
    const checkMovie = await this.prisma.movie.findFirst({
      where: {
        id: id
      }
    });
    if(!checkMovie){
      throw new NotFoundException('Movie Schedule not found');
    }

    await this.prisma.movie.delete({
      where: {id: id}
    })
  }

  async getMoviesWithName(name: string) {
    const movies = await this.prisma.movie.findMany({
      where: {
        movie_name: {
          contains: name
        }
      }
    });

    return movies
  }

  async getMoviesWithNamePaging(name: string, page: number, pageSize: number){
    const movies = await this.prisma.movie.findMany({
      where: {
        movie_name: {
          contains: name
        }
      },
      take: pageSize,
      skip: page
    });

    return movies
  }
}
