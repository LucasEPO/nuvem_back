import { forwardRef, Module } from '@nestjs/common';
import { PrintsService } from './prints.service';
import { PrintsController } from './prints.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Print } from './entities/print.entity';
import { CartItensModule } from 'src/cart_itens/cart_itens.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Print]),
    forwardRef(() => CartItensModule),
  ],
  controllers: [PrintsController],
  providers: [PrintsService],
  exports: [PrintsService],
})
export class PrintsModule {}
