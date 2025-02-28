import { Controller, Post, Body } from '@nestjs/common';

import { UserService } from './user.service';
import { SignUserDto } from './dto/sign-user.dto';
import { ApiBody, ApiCreatedResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  @ApiCreatedResponse({
    schema: {
      type: 'object',
      properties: {
        token: { type: 'string' },
      },
    },
  })
  @ApiBody({
    type: SignUserDto,
  })
  signUp(@Body() data: SignUserDto) {
    return this.userService.signup(data);
  }

  @Post('/signin')
  @ApiCreatedResponse({
    schema: {
      type: 'object',
      properties: {
        token: { type: 'string' },
      },
    },
  })
  @ApiBody({
    type: SignUserDto,
  })
  signIn(@Body() data: SignUserDto) {
    return this.userService.signin(data);
  }
}
