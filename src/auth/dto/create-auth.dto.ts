import { IsDateString, IsString, Length } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  @Length(4, 24)
  user_id: string;

  @IsString()
  @Length(1, 8)
  user_name: string;

  @IsString()
  @Length(10, 11)
  user_tel: string;

  @IsString()
  user_mail: string;

  @IsDateString()
  user_birth: Date | string;

  @IsString()
  @Length(6, 30)
  user_pw: string;

  @IsString()
  @Length(1, 5)
  major: string;
}
