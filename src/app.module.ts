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
import { FileModule } from './modules/file/file.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: '360d' },
    }),
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
    FileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
