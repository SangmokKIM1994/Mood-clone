import { Test, TestingModule } from '@nestjs/testing';
import { RecommentsController } from './recomments.controller';

describe('RecommentsController', () => {
  let controller: RecommentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecommentsController],
    }).compile();

    controller = module.get<RecommentsController>(RecommentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
