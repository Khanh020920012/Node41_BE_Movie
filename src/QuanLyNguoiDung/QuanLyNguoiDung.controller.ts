import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query, Put } from '@nestjs/common';
import {QuanLyNguoiDungService} from './QuanLyNguoiDung.service';
import { ApiBody, ApiHeader, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';

@Controller('api/QuanLyNguoiDung')
@ApiTags('QuanLyNguoiDung')
export class QuanLyNguoiDungController {
    constructor(private readonly quanLyDatVeService: QuanLyNguoiDungService) {}

    @Get('LayDanhSachLoaiNguoiDung')
    @ApiResponse({
        status: 200,
        description: "success",
    })
    async layDanhSachLoaiNguoiDung(
    ){
        return await this.quanLyDatVeService.getUserTypes();
    }

    @Post('DangNhap')
    @ApiBody({
        type: CreateUserDto,
        examples: {
            exampleRequest: {
                summary: 'Example Request',
                value: {
                    "email": "dtrinh@gmail.com",
                    "password": "xxxxxxxx"
                }
            }
        }
    })
    @ApiResponse({
        status: 200,
        description: "Login success",
    })
    async dangNhap(
        @Body('email') email: string,
        @Body('password') password: string)
        {
            return await this.quanLyDatVeService.userLogin(email, password);
        }    
    
    @Post('DangKy')
    @ApiBody({
        type: CreateUserDto,
        examples: {
            exampleRequest: {
                summary: 'Example Request',
                value: {
                    "fullname": "Tonnie Tam",
                    "email": "ttam4456@mail.com",
                    "phone": "55555",
                    "password": "tam123",
                    "user_type": "USER"
                }
            }
        }
    })
    @ApiResponse({
        status: 200,
        description: "Create success",
    })
    async dangKy(
        @Body('fullname') fullname: string,
        @Body('email') email: string,
        @Body('phone') phone: string,
        @Body('password') password: string,
        @Body('user_type') user_type: string)
        {
            return await this.quanLyDatVeService.createUser(fullname, email, phone, password, user_type);
        }

    @Get('LayDanhSachNguoiDung')
    @ApiQuery({
        name: "user_type"
    })
    @ApiResponse({
        status: 200,
        description: "success",
    })
    async layDanhSachNguoiDung(
        @Query('user_type') user_type: string)
        {
            return await this.quanLyDatVeService.getUserByType(user_type);
        }

    @Get('LayDanhSachNguoiDungPhanTrang')
    @ApiQuery({
        name: "user_type",
        type: String
    })
    @ApiQuery({
        name: "page",
        type: Number
    })
    @ApiQuery({
        name: "pageSize",
        type: Number
    })
    @ApiResponse({
        status: 200,
        description: "success",
    })
    async layDanhSachNguoiDungPhanTrang(
        @Query('user_type') user_type: string,
        @Query('page') page: number,
        @Query('pageSize') pageSize: number)
        {
            return await this.quanLyDatVeService.getUserByTypePaging(user_type, +page, +pageSize);
        }

    @Get('TimKiemNguoiDung')
    @ApiQuery({
        name: "fullname",
        type: String
    })
    @ApiQuery({
        name: "email",
        type: String
    })
    @ApiQuery({
        name: "phone",
        type: String
    })
    @ApiResponse({
        status: 200,
        description: "success",
    })
    async timKiemNguoiDung(
        @Query('fullname') fullname: string,
        @Query('email') email: string,
        @Query('phone') phone: string)
        {
            return await this.quanLyDatVeService.getUsersByFilters(fullname, email, phone);
        }

    @Get('TimKiemNguoiDungPhanTrang')
    @ApiQuery({
        name: "fullname",
        type: String
    })
    @ApiQuery({
        name: "email",
        type: String
    })
    @ApiQuery({
        name: "phone",
        type: String
    })
    @ApiQuery({
        name: "page",
        type: Number
    })
    @ApiQuery({
        name: "pageSize",
        type: Number
    })
    @ApiResponse({
        status: 200,
        description: "success",
    })
    async timKiemNguoiDungPhanTrang(
        @Query('fullname') fullname: string,
        @Query('email') email: string,
        @Query('phone') phone: string,
        @Query('page') page: number,
        @Query('pageSize') pageSize: number)
        {
            return await this.quanLyDatVeService.getUsersByFiltersPaging(+page, +pageSize,
                fullname, email, phone);
        }

    @Get('ThongTinTaiKhoan')
    @UseGuards(JwtAuthGuard)
    @ApiHeader({
        name: 'Authorization',
        required: true,
    })
    @ApiResponse({
        status: 200,
        description: "success",
    })
    async thongTinTaiKhoan(
       @Req() req: Request)
        {
            return await this.quanLyDatVeService.getCurrentUser(req);
        }

    @Get('LayThongTinNguoiDung')
    @UseGuards(JwtAuthGuard)
    @ApiHeader({
        name: 'Authorization',
        required: true,
        description: 'Only USER with User Type = ADMIN can successfully execute this API'
    })
    @ApiQuery({
        name: 'user_id',
        type: Number
    })
    @ApiResponse({
        status: 200,
        description: "success",
    })
    async layThongTinNguoiDung(
        @Query('user_id') user_id: number,
        @Req() req: Request)
        {
            return await this.quanLyDatVeService.getUserData(req, +user_id);
        }

    @Put('CapNhatThongTinNguoiDung')
    @UseGuards(JwtAuthGuard)
    @ApiHeader({
        name: 'Authorization',
        required: true
    })
    @ApiBody({
        type: UpdateUserDto,
        examples: {
            exampleRequest: {
                summary: 'Example Request',
                value: {
                    "fullname": "string",
                    "password": "string",
                    "email": "string",
                    "phone": "string",
                    "user_type": "string"
                }
            }
        }
    })
    @ApiResponse({
        status: 200,
        description: "success",
    })
    async CapNhatThongTinNguoiDung(
        @Req() req: Request,
        @Body('fullname') fullname: string,
        @Body('email') email: string,
        @Body('phone') phone: string,
        @Body('password') password: string,
        @Body('user_type') user_type: string)
        {
            return await this.quanLyDatVeService.update(req, fullname, email, phone, password, user_type);
        }

    @Delete('XoaNguoiDung')
    @UseGuards(JwtAuthGuard)
    @ApiHeader({
        name: 'Authorization',
        required: true
    })
    @ApiQuery({
        name: 'user_id',
        type: Number
    })
    @ApiResponse({
        status: 200,
        description: "success",
    })
    async xoaNguoiDung(
        @Req() req: Request)
        {
            return await this.quanLyDatVeService.remove(req);
        }
}