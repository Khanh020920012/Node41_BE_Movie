import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query, Put,
    UseInterceptors, UploadedFile
 } from '@nestjs/common';
import {QuanLyPhimService} from './QuanLyPhim.service';
import { ApiBody, ApiConsumes, ApiHeader, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import {diskStorage} from 'multer';

@Controller('api/QuanLyPhim')
@ApiTags('QuanLyPhim')
export class QuanLyPhimController {
    constructor(private readonly quanLyPhimService: QuanLyPhimService) {}

    @Get('LayDanhSachBanner')
    @ApiResponse({
        status: 200,
        description: 'Success'
    })
    async layDanhSachBanner(){
        return await this.quanLyPhimService.findAllBanner();
    }

    @Get('LayDanhSachPhim')
    @ApiQuery({
        name: 'movieName',
        type: String
    })
    @ApiResponse({
        status: 200,
        description: 'Success'
    })
    async layDanhSachPhim(
        @Query('movieName') movieName: string
    ){
        return await this.quanLyPhimService.getMoviesWithName(movieName);
    }

    @Get('LayDanhSachPhimPhanTrang')
    @ApiQuery({
        name: 'movieName',
        type: String
    })
    @ApiQuery({
        name: 'page',
        type: Number
    })
    @ApiQuery({
        name: 'pageSize',
        type: Number
    })
    @ApiResponse({
        status: 200,
        description: 'Success'
    })
    async layDanhSachPhimPhanTrang(
        @Query('movieName') movieName: string,
        @Query('page') page: number,
        @Query('pageSize') pageSize: number
    ){
        return await this.quanLyPhimService.getMoviesWithNamePaging(movieName, +page, +pageSize);
    }

    @Get('LayDanhSachPhimTheoNgay')
    @ApiQuery({
        name: 'movieName',
        type: String
    })
    @ApiQuery({
        name: 'page',
        type: Number
    })
    @ApiQuery({
        name: 'pageSize',
        type: Number
    })
    @ApiQuery({
        name: 'fromDate',
        type: String
    })
    @ApiQuery({
        name: 'toDate',
        type: String
    })
    @ApiResponse({
        status: 200,
        description: 'Success'
    })
    async layDanhSachPhimTheoNgay(
        @Query('movieName') movieName: string,
        @Query('page') page: number,
        @Query('pageSize') pageSize: number,
        @Query('fromDate') fromDate: string,
        @Query('toDate') toDate: number
    ){
        const fromDateTime = new Date(fromDate);
        const toDateTime = new Date(toDate);
        return await this.quanLyPhimService.getMoviesInRange(movieName, fromDateTime, toDateTime, +page, +pageSize);
    }

    @Post('ThemPhimUploadHinh')
    @ApiResponse({
        status: 200,
        description: 'Success'
    })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                name: {
                    type: 'string'
                },
                trailer: {
                    type: 'string'
                },
                image: {
                    type: 'string',
                    format: 'binary'
                },
                description: {
                    type: 'string'
                },
                premiere_day: {
                    type: 'string',
                    format: 'ISO 8061 Format'
                },
                rating: {
                    type: 'string',
                    format: 'Number value'
                },
                hot: {
                    type: 'string',
                    format: 'Boolean value'
                },
                showing: {
                    type: 'string',
                    format: 'Boolean value'
                },
                showing_soon: {
                    type: 'string',
                    format: 'Boolean value'
                }
            }
        }
    })
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
    async themPhimUploadHinh(
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
        return await this.quanLyPhimService.createMovie(name, trailer, image,
        description, premiere_day, rating, hot, showing, showing_soon);
    }

    @Post('CapNhatPhimUpload')
    @UseGuards(JwtAuthGuard)
    @ApiResponse({
        status: 200,
        description: 'Success'
    })
    @ApiConsumes('multipart/form-data')
    @ApiHeader({
        name: 'Authorization',
        required: true,
    })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                id: {
                    type: 'string'
                },
                name: {
                    type: 'string'
                },
                trailer: {
                    type: 'string'
                },
                image: {
                    type: 'string',
                    format: 'binary'
                },
                description: {
                    type: 'string'
                },
                premiere_day: {
                    type: 'string',
                    format: 'ISO 8061 Format'
                },
                rating: {
                    type: 'string',
                    format: 'Number value'
                },
                hot: {
                    type: 'string',
                    format: 'Boolean value'
                },
                showing: {
                    type: 'string',
                    format: 'Boolean value'
                },
                showing_soon: {
                    type: 'string',
                    format: 'Boolean value'
                }
            }
        }
    })
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
    async capNhatPhimUpload(
        @Body('id') id: string, 
        @Body('name') name: string,
        @Body('trailer') trailer: string,
        @UploadedFile() file: Express.Multer.File,
        @Body('description') description: string,
        @Body('premiere_day') premiere_day: Date,
        @Body('rating') rating: string,
        @Body('hot') hot: string,
        @Body('showing') showing: string,
        @Body('showing_soon') showing_soon: string,
        @Req() req: Request
        ) {
        const image = file ? file.filename: "";
        return await this.quanLyPhimService.updateMovie(id, name, trailer, image,
        description, premiere_day, rating, hot, showing, showing_soon, req);
    }

    @Delete('XoaPhim')
    @UseGuards(JwtAuthGuard)
    @ApiHeader({
        name: 'Authorization',
        required: true,
    })
    @ApiQuery({
        name: 'movieId',
        type: Number
    })
    async xoaPhim(
        @Req() req: Request,
        @Query('movieId') movieId: number
    ) {
        return await this.quanLyPhimService.removeMovie(+movieId, req);
    }

    @Get('LayThongTinPhim')
    @ApiQuery({
        name: 'movieId',
        type: Number
    })
    @ApiResponse({
        status: 200,
        description: 'Success'
    })
    async layThongTinPhim(
        @Query('movieId') movieId: number
    ){
        return await this.quanLyPhimService.findMovie(+movieId);
    }
}