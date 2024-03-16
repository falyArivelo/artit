import { Test, TestingModule } from '@nestjs/testing';
import { RechercheService } from './recherche.service';

describe('RechercheService', () => {
  let service: RechercheService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RechercheService],
    }).compile();

    service = module.get<RechercheService>(RechercheService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
