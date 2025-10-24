import { Test, TestingModule } from '@nestjs/testing';
import { CartItensService } from './cart_itens.service';

describe('CartItensService', () => {
  let service: CartItensService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartItensService],
    }).compile();

    service = module.get<CartItensService>(CartItensService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
