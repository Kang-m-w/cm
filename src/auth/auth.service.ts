import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import UsersEntity from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async creatAccount(userData: CreateAuthDto) {
    const { user_id } = userData;
    const find = await this.userRepository.findOne({ where: { user_id } });

    if (find) {
      throw new BadRequestException('중복되는 아이디입니다.');
    }

    const userEntity = new UsersEntity();

    userEntity.user_id = userData.user_id;
    userEntity.user_name = userData.user_name;
    userEntity.user_mail = userData.user_mail;
    userEntity.user_tel = userData.user_tel;
    userEntity.user_birth = userData.user_birth;
    userEntity.user_pw = userData.user_pw;
    userEntity.major = userData.major;

    await this.userRepository.save(userEntity);

    return { success: true };
  }

  async loginAccount(loginData: LoginAuthDto) {
    const { user_id, user_pw } = loginData;

    try {
      if (!user_id || !user_pw) {
        throw new BadRequestException('input your id or pw');
      }
      const find = await this.userRepository.findOne({
        where: { user_id, user_pw },
      });

      if (!find) {
        throw new UnauthorizedException('wrong account');
      }

      const payload = { id: find.user_id, email: find.user_mail };

      return this.jwtService.sign(payload, { expiresIn: '8h' });
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException('login fail');
    }
  }

  validateToken(token: string) {
    if (token.includes('Bearer')) {
      token = token.split(' ')[1];
    }
    const a = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });
    console.log(a);
    return a;
  }

  getToken(req: Request) {
    const authorization = req.headers.authorization;

    if (authorization) {
      return authorization;
    }

    return null;
  }
}
