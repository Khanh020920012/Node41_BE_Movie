import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from './user.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'yourSecretKeyHere', // Use an environment variable or a hardcoded secret in development
      signOptions: { expiresIn: '1h' }, // Example: Token expires in 1 hour
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
