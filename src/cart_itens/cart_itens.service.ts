import { Injectable } from '@nestjs/common';
import { CreateCartItenDto } from './dto/create-cart_iten.dto';
import { UpdateCartItenDto } from './dto/update-cart_iten.dto';

@Injectable()
export class CartItensService {
  create(createCartItenDto: CreateCartItenDto) {
    return 'This action adds a new cartIten';
  }

  findAll() {
    return `This action returns all cartItens`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cartIten`;
  }

  update(id: number, updateCartItenDto: UpdateCartItenDto) {
    return `This action updates a #${id} cartIten`;
  }

  remove(id: number) {
    return `This action removes a #${id} cartIten`;
  }
}
