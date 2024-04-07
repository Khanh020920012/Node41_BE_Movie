import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(private jwtService: JwtService) {}
  prisma = new PrismaClient();

  async create(fullname: string, email: string, phone: string, password: string, user_type: string) {
    let checkUserEmail = await this.prisma.user.findFirst({
      where: {
        email
      }
    });

    if (checkUserEmail){
      throw new HttpException('User With email already exist!', HttpStatus.BAD_REQUEST);
    }
    
    let hashedPassword = await bcrypt.hash(password, 5);
    return await this.prisma.user.create({
      data: {
        fullname,
        email,
        phone,
        password: hashedPassword,
        user_type
      }
    });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: id
      }
    });
    if (!user){
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: number, fullname: string, email: string, phone: string, password: string, user_type: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: id
      }
    });
    if (!user){
      throw new NotFoundException('User not found');
    }
    return await this.prisma.user.update({
      where: {id},
      data: {
        fullname,
        email,
        phone,
        password,
        user_type
      }
    });
  }

  async remove(id: number) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: id
      }
    });
    if (!user){
      throw new NotFoundException('User not found');
    }

    await this.prisma.user.delete({
      where: {id}
    });
  }

  async userLogin(email: string, password_input: string){
    const user = await this.prisma.user.findFirst({
      where: {
        email
      }
    });
    
    const checkPassword = await bcrypt.compare(password_input, user.password);
    if(!checkPassword){
      throw new HttpException('Invalid Password', HttpStatus.BAD_REQUEST);
    }
    const {password, ...data} = user;
    return {access_token: this.jwtService.sign(data)};
  }
}
