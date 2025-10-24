import { Test, TestingModule } from '@nestjs/testing';
import { CartItensController } from './cart_itens.controller';
import { CartItensService } from './cart_itens.service';

describe('CartItensController', () => {
  let controller: CartItensController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartItensController],
      providers: [CartItensService],
    }).compile();

    controller = module.get<CartItensController>(CartItensController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
