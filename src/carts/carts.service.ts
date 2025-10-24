import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    private readonly usersService: UsersService,
  ) {}
  async create(createCartDto: CreateCartDto) {
    //verificar como trata uuid, se entra como buffer aq e converte depois ou se aq ele ja esta convertido
    return 'This action adds a new cart';
  }

  async findAll() {
    return await this.cartRepository.find();
  }

  async findOne(cart_id: string) {
    const cartIdBuffer = Buffer.from(cart_id.replace(/-/g, ''), 'hex');

    const cart = await this.cartRepository.findOne({
      where: { cart_id: cartIdBuffer },
    });

    if (!cart) {
      throw new NotFoundException(`Carrinho ${cart_id} não encontrado`);
    }

    return cart;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    //verificar como lidar com uuid
    return `This action updates a #${id} cart`;
  }

  async remove(cart_id: string) {
    const cart = await this.findOne(cart_id);
    return await this.cartRepository.remove(cart);
  }
}
