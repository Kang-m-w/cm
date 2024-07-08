import { Module } from '@nestjs/common';
import { ClubService } from './club.service';
import { ClubController } from './club.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import ClubsEntity from 'src/entities/club.entity';
import { JwtStrategy } from 'src/strategies/jwt.strategy';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MulterModule.register({
      dest: './upload',
    }),
    TypeOrmModule.forFeature([ClubsEntity]),
    AuthModule,
  ],
  providers: [ClubService, JwtStrategy],
  controllers: [ClubController],
})
export class ClubModule {}
