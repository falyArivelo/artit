import { Test, TestingModule } from '@nestjs/testing';
import { IaDescriptorService } from './ia-descriptor.service';

describe('IaDescriptorService', () => {
  let service: IaDescriptorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IaDescriptorService],
    }).compile();

    service = module.get<IaDescriptorService>(IaDescriptorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
