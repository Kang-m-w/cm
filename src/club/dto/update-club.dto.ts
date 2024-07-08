import { PartialType } from '@nestjs/mapped-types';
import { CreateClubDto } from './create-club.dto';
import { IsDateString } from 'class-validator';

export class UpdateClubDto extends PartialType(CreateClubDto) {
  @IsDateString()
  st_date: Date | string | null;

  @IsDateString()
  end_date: Date | string | null;
}
