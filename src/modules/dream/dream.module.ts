import { TypeOrmModule } from '@nestjs/typeorm';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AuthMiddleware } from 'src/utils';
import { FileModule } from 'src/base';

import { DreamService } from './dream.service';
import { DreamController } from './dream.controller';
import { Dream } from './entities/dream.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dream]), FileModule],
  controllers: [DreamController],
  providers: [DreamService],
})
export class DreamModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(DreamController);
  }
}
