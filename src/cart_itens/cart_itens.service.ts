import { Injectable } from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart_item.dto';
import { UpdateCartItemDto } from './dto/update-cart_item.dto';

@Injectable()
export class CartItensService {
  create(createCartItemDto: CreateCartItemDto) {
    return 'This action adds a new cartIten';
  }

  findAll() {
    return `This action returns all cartItens`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cartIten`;
  }

  update(id: number, updateCartItemDto: UpdateCartItemDto) {
    return `This action updates a #${id} cartIten`;
  }

  remove(id: number) {
    return `This action removes a #${id} cartIten`;
  }
}
