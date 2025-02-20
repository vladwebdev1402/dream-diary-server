import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { JWT_SECRET } from './constants/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  Character,
  CharacterModule,
  Dream,
  DreamModule,
  Label,
  LabelModule,
  User,
  UserModule,
} from './modules';
import { FileModule } from './base';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: '360d' },
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME || 'user',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'driam-diary-db',
      entities: [User, Label, Dream, Character],
      synchronize: true,
    }),
    DreamModule,
    CharacterModule,
    LabelModule,
    UserModule,
    FileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
