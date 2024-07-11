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
import { Response } from 'express';
import * as fs from 'fs';
import { join } from 'path';
import UsersEntity from 'src/entities/user.entity';
import AffiliationEntity from 'src/entities/affiliation.entity';

@Injectable()
export class ClubService {
  constructor(
    @InjectRepository(ClubsEntity)
    private clubRepository: Repository<ClubsEntity>,
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
    @InjectRepository(AffiliationEntity)
    private affiliationRepository: Repository<AffiliationEntity>,
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

    const master = await this.userRepository.findOne({
      where: { user_name: clubEntity.club_master },
    });

    if (!master) {
      throw new BadRequestException('not exist user');
    }

    await this.clubRepository.save(clubEntity);

    const clubs = await this.clubRepository.findOne({
      where: { club_name },
    });

    console.log(master, clubs);
    const affiliationEntity = new AffiliationEntity();
    affiliationEntity.club_id = clubs.club_id;
    affiliationEntity.user_id = master.user_id;
    await this.affiliationRepository.save(affiliationEntity);

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
    console.log('sd');
    const find = await this.clubRepository.findOne({
      where: { club_id },
    });

    if (!find) {
      throw new NotFoundException('not exist Club');
    }

    Object.assign(find, updateData);

    await this.clubRepository.save(find);

    return { success: true };
  }

  async getClubImg(clubId: string, res: Response) {
    const club = await this.clubRepository.findOne({
      where: { club_id: clubId },
    });

    if (!club || !club.club_poster) {
      res.status(404).send('Club image not found');
      return;
    }

    const imagePath = join(__dirname, '..', club.club_poster);

    res.setHeader('Content-Type', 'image/jpeg');
    fs.createReadStream(imagePath).pipe(res);
  }
}
