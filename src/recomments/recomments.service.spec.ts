import { Test, TestingModule } from '@nestjs/testing';
import { RecommentsService } from './recomments.service';

describe('RecommentsService', () => {
  let service: RecommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecommentsService],
    }).compile();

    service = module.get<RecommentsService>(RecommentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
