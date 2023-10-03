import { Test, TestingModule } from '@nestjs/testing';
import { StreamingsController } from './streamings.controller';

describe('StreamingsController', () => {
  let controller: StreamingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StreamingsController],
    }).compile();

    controller = module.get<StreamingsController>(StreamingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
