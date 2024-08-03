import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'driam-diary-db',
      entities: [User, Label, Dream, Character],
      synchronize: true,
    }),
    DreamModule,
    CharacterModule,
    LabelModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
