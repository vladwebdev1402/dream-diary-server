import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthMiddleware } from 'src/utils';

import { LabelService } from './label.service';
import { LabelController } from './label.controller';
import { Label } from './entities/label.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Label])],
  controllers: [LabelController],
  providers: [LabelService],
})
export class LabelModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(LabelController)
  }
}
