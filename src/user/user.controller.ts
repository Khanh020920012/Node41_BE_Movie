import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

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

  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body('fullname') fullname: string,
    @Body('email') email: string,
    @Body('phone') phone: string,
    @Body('password') password: string,
    @Body('user_type') user_type: string) {
    return this.userService.update(+id, fullname, email, phone, password, user_type);
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

  @UseGuards(JwtAuthGuard)
  @Get('resource')
  getProtectedResource(){
    return { message: 'This is a protected resource' };
  }
}
