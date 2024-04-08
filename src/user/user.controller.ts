import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

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

  @UseGuards(JwtAuthGuard)
  @Get('current-user')
  async getCurrentUserData(
    @Req() req: Request) {
    return await this.userService.getCurrentUser(req);
  }

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

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.userService.remove(+id);
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ){
    return this.userService.userLogin(email, password);
  }
}
