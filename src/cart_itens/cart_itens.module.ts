import { Module } from '@nestjs/common';
import { CartItensService } from './cart_itens.service';
import { CartItensController } from './cart_itens.controller';

@Module({
  controllers: [CartItensController],
  providers: [CartItensService],
})
export class CartItensModule {}
