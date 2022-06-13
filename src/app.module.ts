import 'dotenv/config';

import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

import { AppService } from './app.service';
import { ConvertVideoModule } from './convert-video/convert-video.module';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: process.env.HOST_REDIS,
        port: 6379,
      },
    }),
    ConvertVideoModule,
  ],
  providers: [AppService],
})
export class AppModule {}
