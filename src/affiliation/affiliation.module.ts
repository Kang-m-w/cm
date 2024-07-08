import { Module } from '@nestjs/common';
import { AffiliationController } from './affiliation.controller';
import { AffiliationService } from './affiliation.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import AffiliationEntity from 'src/entities/affiliation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AffiliationEntity]), AuthModule],
  controllers: [AffiliationController],
  providers: [AffiliationService],
})
export class AffiliationModule {}
