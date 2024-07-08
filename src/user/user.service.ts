import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';
import UsersEntity from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
    private readonly authService: AuthService,
  ) {}

  async getUserById(userId: string) {
    try {
      const find = await this.userRepository.findOne({
        where: { uuid: userId },
      });

      if (!find) {
        throw new BadRequestException();
      }

      return find;
    } catch (err) {
      console.log(err);
    }
  }

  async getMyData(req: Request) {
    try {
      const token = this.authService.getToken(req);
      const verify = this.authService.validateToken(token);
      const { email } = verify;
      const data = await this.userRepository.findOne({
        where: { user_mail: email },
      });
      data.user_pw = null;
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
}
