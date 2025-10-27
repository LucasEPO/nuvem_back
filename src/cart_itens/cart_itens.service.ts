import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart_item.dto';
import { UpdateCartItemDto } from './dto/update-cart_item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItem } from './entities/cart_item_entity';
import { Repository } from 'typeorm';
import { CartsService } from 'src/carts/carts.service';
import { PrintsService } from 'src/prints/prints.service';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class CartItensService {
  constructor(
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    private readonly cartService: CartsService,
    private readonly printService: PrintsService,
    private readonly productService: ProductsService,
  ) {}

  async create(createCartItemDto: CreateCartItemDto) {
    const [cart, print, product] = await Promise.all([
      this.cartService.findOne(createCartItemDto.fk_cart_item_cart),
      this.printService.findOne(createCartItemDto.fk_cart_item_print),
      this.productService.findOne(createCartItemDto.fk_cart_item_product),
    ]);

    if (!cart) 
      throw new NotFoundException('Carrinho não encontrado');
    if (!print) 
      throw new NotFoundException('Estampa não encontrada');
    if (!product) 
      throw new NotFoundException('Produto não encontrado');

    const cartItem = this.cartItemRepository.create(createCartItemDto);
    return await this.cartItemRepository.save(cartItem);
  }

  async findAll() {
    return await this.cartItemRepository.find();
  }

  async findOne(id: string) {
    const cartItem = await this.cartItemRepository.findOne({
      where: { cart_item_id: id }
    });

    if(!cartItem)
      throw new NotFoundException(`Item de carrinho #${id} não encontrado`);

    return cartItem;
  }

  async update(id: string, updateCartItemDto: UpdateCartItemDto) {
    await this.findOne(id);

    const validations: Promise<any>[] = [];

    if (updateCartItemDto.fk_cart_item_cart) {
      validations.push(
        this.cartService
          .findOne(updateCartItemDto.fk_cart_item_cart)
          .then(cart => {
            if (!cart)
              throw new NotFoundException('Carrinho não encontrado');
          }),
      );
    }

    if (updateCartItemDto.fk_cart_item_print) {
      validations.push(
        this.printService
          .findOne(updateCartItemDto.fk_cart_item_print)
          .then(print => {
            if (!print)
              throw new NotFoundException('Estampa não encontrada');
          }),
      );
    }

    if (updateCartItemDto.fk_cart_item_product) {
      validations.push(
        this.productService
          .findOne(updateCartItemDto.fk_cart_item_product)
          .then(product => {
            if (!product)
              throw new NotFoundException('Produto não encontrado');
          }),
      );
    }

    if (validations.length > 0) await Promise.all(validations);

    await this.cartItemRepository.update(id, updateCartItemDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    const cartItem = await this.findOne(id);
    return this.cartItemRepository.remove(cartItem);
  }
}
