import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from './jwt-payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'yourSecretKeyHere',
    });
  }

  async validate(payload: JwtPayload) {
    return { 
      id: payload.id, 
      email: payload.email, 
      user_type: payload.user_type,
      iat: payload.iat,
      exp: payload.exp
    };
  }
}
