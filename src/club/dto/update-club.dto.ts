import { PartialType } from '@nestjs/mapped-types';
import { CreateClubDto } from './create-club.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateClubDto extends PartialType(CreateClubDto) {
  @IsNotEmpty()
  st_date: Date | string | null;

  @IsNotEmpty()
  end_date: Date | string | null;
}
