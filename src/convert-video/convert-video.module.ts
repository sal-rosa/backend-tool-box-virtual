import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

import { ConvertVideoService } from './convert-video.service';
import { ConvertVideoController } from './convert-video.controller';
import { ConvertVideoGateWay } from './convert-video.gateway';
import { ConvertVideoProcessor } from './convert-video.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'convert-video'
    }),
  ],
  controllers: [ConvertVideoController],
  providers: [ConvertVideoService, ConvertVideoGateWay, ConvertVideoProcessor],
})
export class ConvertVideoModule { }
