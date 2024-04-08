import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JwtPayload } from 'src/auth/jwt-payload';

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

  async update(req: Request, fullname: string, email: string, phone: string, password: string, user_type: string) {
    const tokenData = req.user as JwtPayload;
    const user = await this.prisma.user.findFirst({
      where: {
        id: tokenData.id
      }
    });
    if (!user){
      throw new NotFoundException('User not found');
    }

    const updateData: any = {};

    if (fullname) {
        updateData.fullname = fullname;
    }
    if (email) {
        updateData.email = email;
    }
    if (phone) {
        updateData.phone = phone;
    }
    if (password) {
        updateData.password = await bcrypt.hash(password, 5);
    }
    if (user_type) {
        updateData.user_type = user_type;
    }

    // Only perform the update if there are fields to update
    if (Object.keys(updateData).length === 0) {
        throw new BadRequestException('No fields to update');
    }

    const {password: dataPassword, ...data} = await this.prisma.user.update({
      where: {id: tokenData.id},
      data: updateData
    })
    return data;
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

  async getCurrentUser(req: Request){
    const tokenData = req.user as JwtPayload;
    const user = await this.prisma.user.findFirst({
      where: {
        id: tokenData.id
      }
    });

    const {password, ...data} = user;
    return data;
  }
}
