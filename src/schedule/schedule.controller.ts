import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get('/:id')
  async getScheduleList(@Param('id') clubId: string) {
    const data = await this.scheduleService.getScheduleList(clubId);
    return data;
  }

  @UseGuards(AuthGuard)
  @Post('/')
  async writeSchedule(@Body() scheduleData: CreateScheduleDto) {
    return this.scheduleService.createSchedule(scheduleData);
  }
}
