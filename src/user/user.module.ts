import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import UsersEntity from 'src/entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity]), AuthModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}