import { Module } from '@nestjs/common';
import { PrintsService } from './prints.service';
import { PrintsController } from './prints.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Print } from './entities/print.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Print])],
  controllers: [PrintsController],
  providers: [PrintsService],
  exports: [PrintsService],
})
export class PrintsModule {}
