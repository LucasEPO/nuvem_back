import { forwardRef, Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItensModule } from 'src/cart_itens/cart_itens.module';
import { CollectionsModule } from 'src/collections/collections.module';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Product]),
    forwardRef(() => CartItensModule),
    CollectionsModule,
    CategoriesModule
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports:[ProductsService]
})
export class ProductsModule {}
