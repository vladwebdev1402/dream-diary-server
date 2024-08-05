import { TypeOrmModule } from '@nestjs/typeorm';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AuthMiddleware } from 'src/utils';
import { FileModule } from 'src/base';

import { Character } from './entities/character.entity';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Character]), FileModule],
  controllers: [CharacterController],
  providers: [CharacterService],
})
export class CharacterModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(CharacterController);
  }
}
