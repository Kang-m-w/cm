import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './orm.config';
import { ConfigModule } from './config/config.module';
import { ClubModule } from './club/club.module';
import { UserModule } from './user/user.module';
import { AffiliationModule } from './affiliation/affiliation.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(ormConfig),
    AuthModule,
    ConfigModule,
    ClubModule,
    UserModule,
    AffiliationModule,
  ],
})
export class AppModule {}
