import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ClubsEntity from 'src/entities/club.entity';
import { Like, Repository } from 'typeorm';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';

@Injectable()
export class ClubService {
  constructor(
    @InjectRepository(ClubsEntity)
    private clubRepository: Repository<ClubsEntity>,
  ) {}

  async getClub(id: string) {
    try {
      const data = await this.clubRepository.findOne({
        where: { club_id: id },
      });

      return data;
    } catch (err) {
      throw new NotFoundException('not exist club');
    }
  }

  async getAllClub() {
    try {
      const data = await this.clubRepository.find();

      return data;
    } catch (err) {
      throw new NotFoundException('not exist');
    }
  }

  async getAllClubByTag(tag: string) {
    try {
      const data = await this.clubRepository.find({
        where: { classification: tag },
      });

      return data;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async searchClub(search: string) {
    try {
      const data = await this.clubRepository.find({
        where: { club_name: Like(`%${search}%`) },
      });

      return data;
    } catch (err) {
      throw new NotFoundException('wrong search');
    }
  }

  async createClub(createClubData: CreateClubDto) {
    const { club_name } = createClubData;
    const find = await this.clubRepository.findOne({
      where: { club_name },
    });

    if (find) {
      throw new BadRequestException('already exist club');
    }

    const clubEntity = new ClubsEntity();
    clubEntity.club_name = createClubData.club_name;
    clubEntity.club_master = createClubData.club_master;
    clubEntity.classification = createClubData.classification;
    clubEntity.club_poster = createClubData.club_poster;
    clubEntity.description = createClubData.description;
    clubEntity.teacher = createClubData.teacher;
    clubEntity.st_date = null;
    clubEntity.end_date = null;

    await this.clubRepository.save(clubEntity);

    return { success: true };
  }

  async deleteClub(club_id: string) {
    const find = await this.clubRepository.findOne({
      where: { club_id },
    });

    if (find) {
      await this.clubRepository.delete({ club_id });
    } else {
      throw new BadRequestException('no exist Club');
    }
  }

  async updateClub(club_id: string, updateData: UpdateClubDto) {
    const find = await this.clubRepository.findOne({
      where: { club_id },
    });

    if (!find) {
      throw new NotFoundException('not exist Club');
    }

    Object.assign(find, updateData);

    await this.clubRepository.save(find);
  }
}
