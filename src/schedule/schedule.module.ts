import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { AuthModule } from 'src/auth/auth.module';
import ScheduleEntity from 'src/entities/schedule.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([ScheduleEntity])],
  providers: [ScheduleService],
  controllers: [ScheduleController],
})
export class ScheduleModule {}
