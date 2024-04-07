// auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret-key', // Use an environment variable for the secret key
      signOptions: { expiresIn: '60m' }, // Token expires in 60 minutes
    }),
    // Other modules like PassportModule
  ],
  providers: [AuthService, JwtStrategy],
  // Controllers, providers, etc.
})
export class AuthModule {}
