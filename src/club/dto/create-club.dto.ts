import { Exclude } from 'class-transformer';
import { IsOptional, IsString, Length } from 'class-validator';

export class CreateClubDto {
  @IsString()
  club_name: string;

  @IsString()
  @Length(1, 5)
  classification: string;

  @Exclude()
  club_poster: string;

  @IsString()
  @Length(1, 8)
  @IsOptional()
  club_master: string;

  @IsString()
  @Length(1, 8)
  teacher: string;

  @IsString()
  @Length(1, 100)
  description: string;
}
