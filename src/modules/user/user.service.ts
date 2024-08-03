import { DataSource } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { HttpException, Injectable } from '@nestjs/common';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';

import { SignUserDto } from './dto/sign-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    private dataSourse: DataSource,
    private jwtService: JwtService,
  ) {}

  async signup(sign: SignUserDto) {
    const salt = genSaltSync(10);
    const hashPassword = hashSync(sign.password, salt);

    const user = await this.dataSourse.manager.findOne(User, {
      where: {
        mail: sign.email,
      },
    });

    if (user !== null)
      throw new HttpException(
        'Пользователь с такой почтой уже существует',
        400,
      );

    const newUser = await this.dataSourse.manager.save(User, {
      mail: sign.email,
      password: hashPassword,
    });

    const token = this.jwtService.sign({ id: newUser.id });

    return { token };
  }

  async signin(sign: SignUserDto) {
    const user = await this.dataSourse.manager.findOne(User, {
      where: {
        mail: sign.email,
      },
    });

    if (!user)
      throw new HttpException('Пользователь с такой почтой не найден', 400);

    if (!compareSync(sign.password, user.password))
      throw new HttpException('Пароль введён неверно', 400);

    const token = this.jwtService.sign({ id: user.id });

    return { token };
  }

  testSignIn() {
    const token = this.jwtService.sign({ id: -1 });
    return { token };
  }
}
