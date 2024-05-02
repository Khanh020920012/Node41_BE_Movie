import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query, Put } from '@nestjs/common';
import {QuanLyRapService} from './QuanLyRap.service';
import { ApiBody, ApiHeader, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';

@Controller('api/QuanLyRap')
@ApiTags('QuanLyRap')
export class QuanLyRapController {
    constructor(private readonly quanLyRapService: QuanLyRapService) {}

    @Get('LayThongTinHeThongRap')
    @ApiQuery({
        name: "cinemaChainId",
        type: Number
    })
    @ApiResponse({
        status: 200,
        description: 'success'
    })
    async layThongTinHeThongRap(
        @Query('cinemaChainId') cinemaChainId: number
    ){
        return await this.quanLyRapService.findOne(+cinemaChainId);
    }

    @Get('LayThongTinCumRapTheoHeThong')
    @ApiQuery({
        name: "cinemaChainId",
        type: Number
    })
    @ApiResponse({
        status: 200,
        description: 'success'
    })
    async layThongTinCumRapTheoHeThong(
        @Query('cinemaChainId') cinemaChainId: number
    ){
        return await this.quanLyRapService.getCinemaGroupInChain(+cinemaChainId);
    }

    @Get('LayThongTinLichChieuHeThongRap')
    @ApiQuery({
        name: "cinemaChainId",
        type: Number
    })
    @ApiQuery({
        name: "movieId",
        type: Number
    })
    @ApiResponse({
        status: 200,
        description: 'success'
    })
    async layThongTinLichChieuHeThongRap(
        @Query('cinemaChainId') cinemaChainId: number,
        @Query('movieId') movieId: number
    ){
        return await this.quanLyRapService.getMovieScheduleForChain(+cinemaChainId, +movieId);
    }

    @Get('LayThongTinLichChieuPhim')
    @ApiQuery({
        name: "movieId",
        type: Number
    })
    @ApiResponse({
        status: 200,
        description: 'success'
    })
    async layThongTinLichChieuPhim(
        @Query('movieId') movieId: number
    ){
        return await this.quanLyRapService.getMovieScheduleFromMovieId(+movieId);
    }
}