import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { ConvertVideoService } from './convert-video.service';
import { CreateConvertVideoDto } from './dto/create-convert-video.dto';
import MakeRandomString from 'src/utils/make-random-string';

@Controller()
export class ConvertVideoController {
  constructor(private readonly convertVideoService: ConvertVideoService) { }

  @Post('convert-video')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: function (req, file, cb) {
          cb(null, MakeRandomString(5) + '.' + file.originalname.split('.').pop());
        },
      }),
    }),
  )
  async create(
    @Body() createConvertVideoDto: CreateConvertVideoDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.convertVideoService.create(createConvertVideoDto, file);
  }
}
