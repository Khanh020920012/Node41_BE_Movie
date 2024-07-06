import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import {QuanLyDatVeService} from './QuanLyDatVe.service';
import { ApiBody, ApiHeader, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';
import { CreateMovieScheduleDto } from 'src/movie_schedule/dto/create-movie_schedule.dto';
import { CreateMovieBookingDto } from 'src/movie_booking/dto/create-movie_booking.dto';
import { scheduled } from 'rxjs';

@Controller('api/QuanLyDatVe')
@ApiTags('QuanLyDatVe')
export class QuanLyDatVeController {
    constructor(private readonly quanLyDatVeService: QuanLyDatVeService) {}

    @Post('TaoLichChieu')
    @UseGuards(JwtAuthGuard)
    @ApiHeader({
        name: 'Authorization',
        required: true,
        description: 'Authentication token. Only user with type = ADMIN can create movie schedule'
    })
    @ApiBody({
        type: CreateMovieScheduleDto,
        examples: {
            exampleRequest: {
                summary: 'Example Request',
                value: {
                    movie_id: 0,
                    showing_datetime: "2024-05-01T00:00:00",
                    ticket_price: 20,
                    cinema_id: 3
                }
            }
        }
    })
    @ApiResponse({
        status: 200,
        description: "Create Movie Schedule success",
        schema: {
            example: {
                "id": 4,
                "cinema_id": 3,
                "movie_id": 3,
                "showing_datetime": "2024-04-30T17:00:00.000Z",
                "ticket_price": 20
            }
        }
    })
    async taoLichChieu(
        @Req() req: Request,
        @Body('movie_id') movie_id: number,
        @Body('showing_datetime') showing_datetime: string,
        @Body('ticket_price') ticket_price: number,
        @Body('cinema_id') cinema_id: number
    ){
        return await this.quanLyDatVeService.createMovieSchedule(req, cinema_id, movie_id, showing_datetime, ticket_price);
    }

    @Post('DatVe')
    @UseGuards(JwtAuthGuard)
    @ApiHeader({
        name: 'Authorization',
        required: true,
    })
    @ApiBody({
        type: CreateMovieBookingDto,
        examples: {
            exampleRequest: {
                summary: 'Example Request',
                value: {
                    "scheduke_id": 4,
                    "list_seats": [
                        {"seat_id": 9}
                    ]
                }
            }
        }
    })
    @ApiResponse({
        status: 201,
        description: "Create Movie Booking success",
    })
    async datVe(
        @Req() req: Request,
        @Body('schedule_id') schedule_id: number,
        @Body('list_seats') list_seats: any[],)
        {
            return await this.quanLyDatVeService.createMovieBooking(req, schedule_id, list_seats);
        }

    @Get('LayDanhSachPhongVe')
    @ApiResponse({
        status: 200,
        description: "success"
        })
    async layDanhSachPhongVe(
        @Query('scheduleId') scheduleId: number 
    ){
        return await this.quanLyDatVeService.getAvailableSeatForMovieSchedule(+scheduleId);
    }
}
//