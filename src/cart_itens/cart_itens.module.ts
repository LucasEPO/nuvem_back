import { forwardRef, Module } from '@nestjs/common';
import { CartItensService } from './cart_itens.service';
import { CartItensController } from './cart_itens.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from './entities/cart_item_entity';
import { CartsModule } from 'src/carts/carts.module';
import { ProductsModule } from 'src/products/products.module';
import { PrintsModule } from 'src/prints/prints.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartItem]),
    forwardRef(() => CartsModule),
    forwardRef(() => ProductsModule),
    forwardRef(() => PrintsModule)
  ],
  controllers: [CartItensController],
  providers: [CartItensService],
  exports: [CartItensService],
})
export class CartItensModule {}
