import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { CollectionsModule } from './collections/collections.module';
import { PrintsModule } from './prints/prints.module';
import { ReviewsModule } from './reviews/reviews.module';
import { CartsModule } from './carts/carts.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { CartItensModule } from './cart_itens/cart_itens.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '3306'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV !== 'production'
    }),
    UsersModule,
    CategoriesModule,
    CollectionsModule,
    PrintsModule,
    ReviewsModule,
    CartsModule,
    ProductsModule,
    AuthModule,
    CartItensModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
