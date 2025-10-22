import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PrintsService } from './prints.service';
import { CreatePrintDto } from './dto/create-print.dto';
import { UpdatePrintDto } from './dto/update-print.dto';

@Controller('prints')
export class PrintsController {
  constructor(private readonly printsService: PrintsService) {}

  @Post()
  create(@Body() createPrintDto: CreatePrintDto) {
    return this.printsService.create(createPrintDto);
  }

  @Get()
  findAll() {
    return this.printsService.findAll();
  }

  @Get(':param')
  findOne(@Param('param') param: string) {
    if(!isNaN(+param)) 
      return this.printsService.findOne(+param);

    return this.printsService.findOneByCode(param)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePrintDto: UpdatePrintDto) {
    return this.printsService.update(+id, updatePrintDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.printsService.remove(+id);
  }
}
