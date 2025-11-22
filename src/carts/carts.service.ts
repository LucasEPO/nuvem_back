import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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
    const user = await this.usersService.findOne(createCartDto.fk_cart_user);
    
    if (!user) 
      throw new NotFoundException(`Usuário com id ${createCartDto.fk_cart_user} não encontrado.`);

    const checkUser = await this.findByUser(user.user_id);
    
    if(checkUser)
      throw new ConflictException("O usuário já possui um carrinho")

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

   async findByUser(userId: string): Promise<Cart> {
    const cart = await this.cartRepository.findOne({
      where: {
        user: { user_id: userId },
      },
      relations: {
        cart_itens: {
          product: true,
          print: true,
        },
        user: true,
      },
    });

    if (!cart) 
      throw new NotFoundException("Carrinho não encontrado para este usuário");

    return cart;
  }
  

  async update(id: string, updateCartDto: UpdateCartDto) {
    await this.cartRepository.update(id, updateCartDto);

    return this.findOne(id);
  }

  async remove(id: string) {
    const cart = await this.findOne(id);
    return await this.cartRepository.remove(cart);
  }
}
