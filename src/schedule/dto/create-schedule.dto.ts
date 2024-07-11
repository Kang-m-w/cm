import { IsDateString, IsString } from 'class-validator';

export class CreateScheduleDto {
  @IsString()
  schedule_name: string;

  @IsString()
  schedule_desc: string;

  @IsString()
  club_id: string;

  @IsString()
  schedule_area: string;

  @IsDateString()
  schedule_date: Date | string;
}
