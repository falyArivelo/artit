import { Test, TestingModule } from '@nestjs/testing';
import { RechercheController } from './recherche.controller';

describe('RechercheController', () => {
  let controller: RechercheController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RechercheController],
    }).compile();

    controller = module.get<RechercheController>(RechercheController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
