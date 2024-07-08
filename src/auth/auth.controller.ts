import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

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
}
