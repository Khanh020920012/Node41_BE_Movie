import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/jwt-payload';
import * as bcrypt from 'bcrypt';

@Injectable()
export class QuanLyPhimService {
  constructor(private jwtService: JwtService) {}
  prisma = new PrismaClient();

  async findAllBanner() {
    return await this.prisma.banner.findMany();
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

  async getMoviesInRange(movieName: string, fromDate: Date, toDate: Date, page: number, pageSize: number){
    return await this.prisma.movie.findMany({
      where: {
        premiere_day: {
          gte: fromDate,
          lte: toDate
        },
        movie_name: {
          contains: movieName
        }
      },
      take: pageSize,
      skip: page
    })
  }

  async createMovie(name: string, trailer: string, image: string, description: string
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

  async updateMovie(
    id: string, 
    name: string, 
    trailer: string, 
    image: string, 
    description: string,
    premiere_day: Date, 
    rating: string, 
    hot: string, 
    showing: string,
    showing_soon: string, 
    req: Request
  ): Promise<any> {
    const tokenData = req.user as JwtPayload;
    if (tokenData.user_type != "ADMIN") {
        throw new UnauthorizedException('NOT AUTHORIZE TO DO THIS ACTION');
    }

    const checkId = parseInt(id);
    const checkMovie = await this.prisma.movie.findUnique({
        where: {
            id: checkId
        }
    });

    if (!checkMovie) {
        throw new NotFoundException('Movie not found');
    }

    const dataToUpdate = {};
    if (name !== undefined && name !== checkMovie.movie_name) dataToUpdate['movie_name'] = name;
    if (trailer !== undefined && trailer !== checkMovie.trailer) dataToUpdate['trailer'] = trailer;
    if (image !== undefined && image !== checkMovie.image) dataToUpdate['image'] = image;
    if (description !== undefined && description !== checkMovie.description) dataToUpdate['description'] = description;
    if (premiere_day !== undefined && premiere_day.getTime() !== new Date(checkMovie.premiere_day).getTime()) dataToUpdate['premiere_day'] = premiere_day;
    if (rating !== undefined && parseInt(rating) !== checkMovie.rating) dataToUpdate['rating'] = parseInt(rating);
    if (hot !== undefined && (hot == "true") !== checkMovie.hot) dataToUpdate['hot'] = hot == "true";
    if (showing !== undefined && (showing == "true") !== checkMovie.showing) dataToUpdate['showing'] = showing == "true";
    if (showing_soon !== undefined && (showing_soon == "true") !== checkMovie.showing_soon) dataToUpdate['showing_soon'] = showing_soon == "true";

    if (Object.keys(dataToUpdate).length === 0) {
        return { message: "No changes detected" };
    }

    return await this.prisma.movie.update({
        where: { id: checkId },
        data: dataToUpdate
    });
  }

  async removeMovie(id: number, req: Request) : Promise<void> {
    const tokenData = req.user as JwtPayload;
    if(tokenData.user_type != "ADMIN"){
      throw new UnauthorizedException('NOT AUTHORIZE TO DO THIS ACTION');
    }
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

  async findMovie(id: number): Promise<any> {
    const movie = await this.prisma.movie.findFirst({
      where: {
        id: id
      }
    });
    if (!movie){
      throw new NotFoundException('Movie not found');
    }
    return movie;
  }
}
