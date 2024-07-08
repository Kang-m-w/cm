import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  async getMyData(@Req() req: Request, @Res() res: Response) {
    const data = await this.userService.getMyData(req);
    return res.status(HttpStatus.OK).json({
      success: true,
      data,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getUserById(@Res() res: Response, @Param('id') userId: string) {
    try {
      const existUser = await this.userService.getUserById(userId);
      console.log(existUser);
      return res.status(HttpStatus.OK).json({
        success: true,
        existUser,
      });
    } catch (err) {
      console.log(err);
    }
  }
}
