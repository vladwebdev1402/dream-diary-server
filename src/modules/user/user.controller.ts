import { Controller, Post, Body, Get } from '@nestjs/common';

import { UserService } from './user.service';
import { SignUserDto } from './dto/sign-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  signUp(@Body() data: SignUserDto) {
    return this.userService.signup(data);
  }

  @Post('/signin')
  signIn(@Body() data: SignUserDto) {
    return this.userService.signin(data);
  }

  @Get('/signin/test')
  testSignIn() {
    return this.userService.testSignIn();
  }
}
