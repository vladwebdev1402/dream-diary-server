import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

import { JwtUser } from 'src/types';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const header = req.headers['authorization'];

    if (!header) {
      throw new UnauthorizedException('Токен авторизации не предоставлен');
    }

    const token = header.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Пользователь не авторизован');
    }

    try {
      const user = this.jwtService.verify<JwtUser>(token);
      req['user'] = user;

      next();
    } catch {
      throw new UnauthorizedException('Предоставлен неверный токен');
    }
  }
}
