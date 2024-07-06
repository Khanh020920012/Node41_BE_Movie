import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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

  async getUserTypes() {
    const uniqueUserTypes = await this.prisma.user.findMany({
      distinct: ['user_type'],
      select: {
        user_type: true
      },
    });
    return uniqueUserTypes;
  }

  async getUserByType(type: string) {
    const usersByType = await this.prisma.user.findMany({
      where: {
        user_type: type
      }
    });

    usersByType.forEach((user) => {
      delete user.password
    });
    return usersByType;
  }

  async getUserCountsByType(type: string) {
    const count = await this.prisma.user.count({
      where: {
        user_type: type
      }
    });
    return count;
  }

  async getUserByTypePaging(type: string, page: number, pageSize: number) {
    const usersByType = await this.prisma.user.findMany({
      where: {
        user_type: type
      },
      take: pageSize,
      skip: page
    });

    usersByType.forEach((user) => {
      delete user.password
    });
    return usersByType;
  }

  async getUsersByFilters(fullname?: string, email?: string, phone?: string){
    const users = await this.prisma.user.findMany({
      where: {
        AND: [
          fullname ? { fullname: { contains: fullname } } : {},
          email ? {email: {equals: email}} : {},
          phone ? {phone: {equals: phone}}: {}
        ],
      },
    });

    users.forEach((user) => {
      delete user.password;
     });

    return users;
  }

  async getUsersByFiltersPaging(page: number,
    pageSize: number, fullname?: string, email?: string, phone?: string){
    const users = await this.prisma.user.findMany({
      where: {
        AND: [
          fullname ? { fullname: { contains: fullname } } : {},
          email ? {email: {equals: email}} : {},
          phone ? {phone: {equals: phone}}: {}
        ],
      },
      take: pageSize,
      skip: page
    });

    users.forEach((user) => {
      delete user.password;
     });

    return users;
  }

  async getUserData(req: Request, id: number){
    const tokenData = req.user as JwtPayload;
    if(tokenData.user_type != "ADMIN"){
      throw new UnauthorizedException('NOT AUTHORIZE TO DO THIS ACTION');
    }

    const userData = await this.prisma.user.findFirst({
      where: {
        id
      }
    })

    const {password, ...data} = userData;
    return data;
  }
}
//