import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { ReviewsModule } from 'src/reviews/reviews.module';
import { CartsModule } from 'src/carts/carts.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => ReviewsModule),
    forwardRef(() => CartsModule)
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
