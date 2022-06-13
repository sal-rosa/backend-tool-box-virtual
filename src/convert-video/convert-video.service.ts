import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

import { CreateConvertVideoDto } from './dto/create-convert-video.dto';

@Injectable()
export class ConvertVideoService {
  constructor(@InjectQueue('convert-video') private convertVideoQueue: Queue) { }
  create(createConvertVideoDto: CreateConvertVideoDto, video: any) {
    this.convertVideoQueue.add({
      video,
      formatOutput: createConvertVideoDto.formatOutput,
      socketId: createConvertVideoDto.socketId,
    }, { removeOnComplete: true, removeOnFail: true });
    return 'This action adds a new convertVideo';
  }
}
