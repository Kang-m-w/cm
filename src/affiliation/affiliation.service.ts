import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import AffiliationEntity from 'src/entities/affiliation.entity';
import { Repository } from 'typeorm';
import { AffiDto } from './dto/create-affi.dto';
import { Request } from 'express';

@Injectable()
export class AffiliationService {
  constructor(
    @InjectRepository(AffiliationEntity)
    private affiliationRepository: Repository<AffiliationEntity>,
    private readonly authService: AuthService,
  ) {}

  async joinClub(affiData: AffiDto) {
    try {
      const find = await this.affiliationRepository.findOne({
        where: { user_id: affiData.user_id, club_id: affiData.club_id },
      });

      if (find) {
        throw new BadRequestException('already join');
      }

      const affEntity = new AffiliationEntity();
      affEntity.club_id = affiData.club_id;
      affEntity.user_id = affiData.user_id;

      await this.affiliationRepository.save(affEntity);

      return { success: true };
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async getMyClubList(req: Request) {
    try {
      const token = this.authService.getToken(req);
      const verify = this.authService.validateToken(token);
      const { id } = verify;

      const data = await this.affiliationRepository.find({
        where: { user_id: id },
      });
      return data;
    } catch (err) {
      throw new InternalServerErrorException('server err');
    }
  }
}
