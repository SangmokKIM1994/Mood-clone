import { Test, TestingModule } from '@nestjs/testing';
import { StreamingsService } from './streamings.service';

describe('StreamingsService', () => {
  let service: StreamingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StreamingsService],
    }).compile();

    service = module.get<StreamingsService>(StreamingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
