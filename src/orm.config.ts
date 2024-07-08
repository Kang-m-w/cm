import { ConfigService } from '@nestjs/config';
import { ConfigModule } from './config/config.module';
import { join } from 'path';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

export const ormConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    return {
      type: 'mysql',
      host: configService.get<string>('DATABASE_HOST'),
      port: configService.get<number>('DATABASE_PORT'),
      username: configService.get<string>('DATABASE_USERNAME'),
      password: configService.get<string>('DATABASE_PASSWORD'),
      database: configService.get<string>('DATABASE_SCHEMA'),
      entities: [join(__dirname, '/entities/*.entity{.ts,.js}')],
      logging: false,
      synchronize: true,
    };
  },
};
