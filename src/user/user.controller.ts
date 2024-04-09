import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // QuanLyNguoiDung/ThemNguoiDung
  @Post('create')
  async create(
    @Body('fullname') fullname: string,
    @Body('email') email: string,
    @Body('phone') phone: string,
    @Body('password') password: string,
    @Body('user_type') user_type: string) {
    return await this.userService.create(fullname, email, phone, password, user_type);
  }

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id(\\d+)')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(+id);
  }

  // QuanLyNguoiDung/ThongTinTaiKhoan
  @UseGuards(JwtAuthGuard)
  @Get('current-user')
  async getCurrentUserData(
    @Req() req: Request) {
    return await this.userService.getCurrentUser(req);
  }

  // QuanLyNguoiDung/CapNhatThongTinNguoiDung
  @UseGuards(JwtAuthGuard)
  @Put('update-user')
  async update(
    @Req() req: Request,
    @Body('fullname') fullname: string,
    @Body('email') email: string,
    @Body('phone') phone: string,
    @Body('password') password: string,
    @Body('user_type') user_type: string) {
    return this.userService.update(req, fullname, email, phone, password, user_type);
  }

  // QuanLyNguoiDung/XoaNguoiDung
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.userService.remove(+id);
  }

  // QuanLyNguoiDung/DangNhap
  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ){
    return await this.userService.userLogin(email, password);
  }

  // QuanLyNguoiDung/LayDanhSachLoaiNguoiDung
  @Get('user-types')
  async getUserType(){
    return await this.userService.getUserTypes();
  }

  // QuanLyNguoiDung/LayDanhSachNguoiDung
  @Get('users-by-type')
  async getUserByType(
    @Body('type') type: string
  )
  {
    return await this.userService.getUserByType(type);
  }

  @Get('users-count-by-type')
  async getUserCountByType(
    @Body('type') type: string
  )
  {
    return await this.userService.getUserCountsByType(type);
  }

  // QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang
  @Get('users-by-type-paging')
  async getUserByTypeWithPaging(
    @Body('type') type: string,
    @Body('page') page: number,
    @Body('pageSize') pageSize: number
  )
  {
    return await this.userService.getUserByTypePaging(type, page, pageSize);
  }

  // QuanLyNguoiDung/TimKiemNguoiDung
  @Get('users-by-filter')
  async getUserByFilter(
    @Body('fullname') fullname: string,
    @Body('email') email: string,
    @Body('phone') phone: string
  ) {
    return await this.userService.getUsersByFilters(fullname, email, phone);
  }

  // QuanLyNguoiDung/TimKiemNguoiDungPhanTrang
  @Get('users-by-filter-paging')
  async getUserByFilterWithPaging(
    @Body('page') page: number,
    @Body('pageSize') pageSize: number,
    @Body('fullname') fullname: string,
    @Body('email') email: string,
    @Body('phone') phone: string
  ) {
    return await this.userService.getUsersByFiltersPaging(page, pageSize, fullname, email, phone);
  }

  // QuanLyNguoiDung/LayThongTinNguoiDung
  @Post('get-user-info')
  @UseGuards(JwtAuthGuard)
  async getUserInfo(
    @Req() req: Request,
    @Body('id') id: number 
  ){
    return await this.userService.getUserData(req, id);
  }
}
