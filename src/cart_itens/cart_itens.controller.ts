import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartItensService } from './cart_itens.service';
import { CreateCartItenDto } from './dto/create-cart_iten.dto';
import { UpdateCartItenDto } from './dto/update-cart_iten.dto';

@Controller('cart-itens')
export class CartItensController {
  constructor(private readonly cartItensService: CartItensService) {}

  @Post()
  create(@Body() createCartItenDto: CreateCartItenDto) {
    return this.cartItensService.create(createCartItenDto);
  }

  @Get()
  findAll() {
    return this.cartItensService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartItensService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartItenDto: UpdateCartItenDto) {
    return this.cartItensService.update(+id, updateCartItenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartItensService.remove(+id);
  }
}
