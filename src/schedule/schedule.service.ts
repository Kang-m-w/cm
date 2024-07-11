import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import ScheduleEntity from 'src/entities/schedule.entity';
import { Repository } from 'typeorm';
import { CreateScheduleDto } from './dto/create-schedule.dto';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(ScheduleEntity)
    private scheduleRepository: Repository<ScheduleEntity>,
    private readonly authService: AuthService,
  ) {}

  async getScheduleList(clubId) {
    try {
      const find = await this.scheduleRepository.find({
        where: { club_id: clubId },
        order: { schedule_date: 'asc' },
      });

      return find;
    } catch (err) {
      console.log(err);
    }
  }

  async createSchedule(scheduleData: CreateScheduleDto) {
    try {
      const scheduleEntity = new ScheduleEntity();
      scheduleEntity.schedule_name = scheduleData.schedule_name;
      scheduleEntity.schedule_desc = scheduleData.schedule_desc;
      scheduleEntity.club_id = scheduleData.club_id;
      scheduleEntity.schedule_area = scheduleData.schedule_area;
      scheduleEntity.schedule_date = scheduleData.schedule_date;

      await this.scheduleRepository.save(scheduleEntity);

      return { success: true };
    } catch (err) {
      console.log(err);
    }
  }
}
