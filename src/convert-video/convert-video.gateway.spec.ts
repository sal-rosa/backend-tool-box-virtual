import { Test, TestingModule } from '@nestjs/testing';
import { ConvertVideoGateWay } from './convert-video.gateway';

describe('AppGateway', () => {
  let gateway: ConvertVideoGateWay;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConvertVideoGateWay],
    }).compile();

    gateway = module.get<ConvertVideoGateWay>(ConvertVideoGateWay);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
