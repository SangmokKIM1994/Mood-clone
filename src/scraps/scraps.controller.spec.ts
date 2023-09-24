import { Test, TestingModule } from '@nestjs/testing';
import { ScrapsController } from './scraps.controller';

describe('ScrapsController', () => {
  let controller: ScrapsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScrapsController],
    }).compile();

    controller = module.get<ScrapsController>(ScrapsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
