import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    private readonly usersService: UsersService,
  ) {}

  async create(createCartDto: CreateCartDto) {
    const user = await this.usersService.findOne(createCartDto.fk_cart_user);
    
    if (!user)
      throw new NotFoundException('Usuário não encontrado');

    const cart = this.cartRepository.create({user});
    return await this.cartRepository.save(cart);
  }

  async findAll() {
    return await this.cartRepository.find();
  }

  async findOne(id: string) {
    const cart = await this.cartRepository.findOne({
      where: { cart_id: id }
    });

    if(!cart)
      throw new NotFoundException(`Carrinho #${id} não encontrado`);

    return cart;
  }

  async update(id: string, updateCartDto: UpdateCartDto) {
    await this.findOne(id);

    const updateData: Partial<Cart> = {};

    if (updateCartDto.fk_cart_user) {
      const newUser = await this.usersService.findOne(updateCartDto.fk_cart_user);
      if (!newUser) 
        throw new NotFoundException('Usuário não encontrado');

      updateData['fk_cart_user'] = updateCartDto.fk_cart_user;
    }

    await this.cartRepository.update(id, updateData);

    return this.findOne(id);
  }

  async remove(id: string) {
    const cart = await this.findOne(id);
    return await this.cartRepository.remove(cart);
  }
}
