import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';

import { AuthMiddleware } from 'src/utils';

import { FileController } from './file.controller';
import { FileService } from './file.service';

@Module({
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({path: 'file', method: RequestMethod.POST});
  }
}
