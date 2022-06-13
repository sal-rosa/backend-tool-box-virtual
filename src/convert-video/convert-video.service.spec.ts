import { Test, TestingModule } from '@nestjs/testing';
import { BullModule } from '@nestjs/bull';

import { ConvertVideoService } from './convert-video.service';

describe('ConvertVideoService', () => {
  let service: ConvertVideoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        BullModule.registerQueue({
          name: 'convert-video',
        }),
      ],
      providers: [ConvertVideoService],
    }).compile();

    service = module.get<ConvertVideoService>(ConvertVideoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
