import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Request } from 'express';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/register')
  async register(@Body() userData: CreateAuthDto) {
    await this.authService.creatAccount(userData);
  }

  @Post('/login')
  async login(@Body() loginData: LoginAuthDto) {
    const token = await this.authService.loginAccount(loginData);
    return {
      success: true,
      token,
      message: 'success for login',
    };
  }

  @UseGuards(AuthGuard)
  @Get('/getid')
  getUserId(@Req() req: Request) {
    return this.authService.getUserId(req);
  }
}
