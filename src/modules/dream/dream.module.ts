import { Module } from '@nestjs/common';
import { DreamService } from './dream.service';
import { DreamController } from './dream.controller';

@Module({
  controllers: [DreamController],
  providers: [DreamService],
})
export class DreamModule {}
