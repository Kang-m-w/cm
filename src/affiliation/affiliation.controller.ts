import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AffiliationService } from './affiliation.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { AffiDto } from './dto/create-affi.dto';
import { Request } from 'express';

@Controller('affiliation')
export class AffiliationController {
  constructor(private readonly affiliationService: AffiliationService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async joinClub(@Body() affiData: AffiDto) {
    const data = await this.affiliationService.joinClub(affiData);
    return data;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getMyClubList(@Req() req: Request) {
    const data = await this.affiliationService.getMyClubList(req);
    return data;
  }
}
