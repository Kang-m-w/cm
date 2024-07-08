import { IsNotEmpty, IsString } from 'class-validator';

export class AffiDto {
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  club_id: string;
}
