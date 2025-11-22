import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CartItensService } from './cart_itens.service';
import { CreateCartItemDto } from './dto/create-cart_item.dto';
import { UpdateCartItemDto } from './dto/update-cart_item.dto';

@Controller('cart-itens')
export class CartItensController {
  constructor(private readonly cartItensService: CartItensService) {}

  @Post()
  create(@Body() createCartItenDto: CreateCartItemDto) {
    console.log('edfwe');
    return this.cartItensService.create(createCartItenDto);
  }

  @Get()
  findAll() {
    return this.cartItensService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartItensService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartItenDto: UpdateCartItemDto) {
    return this.cartItensService.update(id, updateCartItenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartItensService.remove(id);
  }
}
