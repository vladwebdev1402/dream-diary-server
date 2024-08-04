import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DataSource } from 'typeorm';
import { Request, Response, NextFunction } from 'express';

import { User } from 'src/modules';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    private dataSourse: DataSource,
  ) {}

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
      const user = this.jwtService.verify<{ id: number }>(token);

      req['user'] = await this.dataSourse.manager.findOne(User, {
        where: {
          id: user.id,
        },
        select: {
          id: true,
        },
      });

      next();
    } catch {
      throw new UnauthorizedException('Пользователь не авторизован');
    }
  }
}
