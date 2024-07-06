import { Module } from '@nestjs/common';
import { QuanLyNguoiDungController } from './QuanLyNguoiDung.controller';
import { QuanLyNguoiDungService } from './QuanLyNguoiDung.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        JwtModule.register({
          secret: process.env.JWT_SECRET || 'yourSecretKeyHere', // Use an environment variable or a hardcoded secret in development
          signOptions: { expiresIn: '1h' }, // Example: Token expires in 1 hour
        }),
      ],
    controllers: [QuanLyNguoiDungController],
    providers: [QuanLyNguoiDungService]
})

export class QuanLyNguoiDungModule {}
//