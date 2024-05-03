import { Module } from '@nestjs/common';
import { QuanLyPhimController } from './QuanLyPhim.controller';
import { QuanLyPhimService } from './QuanLyPhim.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        JwtModule.register({
          secret: process.env.JWT_SECRET || 'yourSecretKeyHere', // Use an environment variable or a hardcoded secret in development
          signOptions: { expiresIn: '1h' }, // Example: Token expires in 1 hour
        }),
      ],
    controllers: [QuanLyPhimController],
    providers: [QuanLyPhimService]
})

export class QuanLyPhimModule {}