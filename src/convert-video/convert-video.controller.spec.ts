import { Test, TestingModule } from '@nestjs/testing';
import { BullModule } from '@nestjs/bull';

import { ConvertVideoService } from './convert-video.service';
import { ConvertVideoController } from './convert-video.controller';

describe('ConvertVideoController', () => {
  let controller: ConvertVideoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        BullModule.registerQueue({
          name: 'convert-video',
        }),
      ],
      controllers: [ConvertVideoController],
      providers: [ConvertVideoService],
    }).compile();

    controller = module.get<ConvertVideoController>(ConvertVideoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
