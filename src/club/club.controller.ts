import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ClubService } from './club.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('club')
export class ClubController {
  constructor(private readonly clubService: ClubService) {}

  @Get()
  searchClub(@Query('search') search: string) {
    return this.clubService.searchClub(search);
  }

  @Get('/all')
  getAllClub() {
    return this.clubService.getAllClub();
  }

  @Get('/all/:tag')
  getAllClubByTag(@Param('tag') tag: string) {
    return this.clubService.getAllClubByTag(tag);
  }

  @Get('/:id')
  getClub(@Param('id') id: string) {
    return this.clubService.getClub(id);
  }

  @UseInterceptors(
    FileInterceptor('club_poster', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, 'upload/'); // 파일 저장 경로 지정
        },
        filename: (req, file, cb) => {
          cb(null, `${Date.now()}-${file.originalname}`); // 파일 이름 지정
        },
      }),
    }),
  )
  @UseGuards(JwtAuthGuard)
  @Post('/')
  async createClub(
    @Body() createClubData: CreateClubDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    createClubData.club_poster = `upload/${file.filename}`; // 파일 경로 설정
    return this.clubService.createClub(createClubData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  deleteClub(@Param('id') id: string) {
    this.clubService.deleteClub(id);
  }

  @Patch('/:id')
  updateClub(@Param('id') id: string, @Body() updateClubData: UpdateClubDto) {
    return this.clubService.updateClub(id, updateClubData);
  }
}
