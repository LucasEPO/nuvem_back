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
      createCartItemDto.fk_cart_item_print
        ? this.printService.findOne(createCartItemDto.fk_cart_item_print)
        : Promise.resolve(null),
      createCartItemDto.fk_cart_item_product
        ? this.productService.findOne(createCartItemDto.fk_cart_item_product)
        : Promise.resolve(null),
    ]);

    const cartItem = this.cartItemRepository.create({
      ...createCartItemDto,
      cart,
      print,
      product,
    } as any);
    
    return await this.cartItemRepository.save(cartItem);
  }

  async findAll() {
    return await this.cartItemRepository.find({relations: ['cart', 'print', 'product']});
  }

  async findOne(id: string) {
    const cartItem = await this.cartItemRepository.findOne({
      where: { cart_item_id: id },
      relations: ['cart', 'print', 'product']
    });

    if(!cartItem)
      throw new NotFoundException(`Item de carrinho #${id} não encontrado`);

    return cartItem;
  }

  async update(id: string, updateCartItemDto: UpdateCartItemDto) {
    const cartItem = await this.findOne(id);

    if (updateCartItemDto.fk_cart_item_print) 
      cartItem.print = await this.printService.findOne(updateCartItemDto.fk_cart_item_print);
    
    if (updateCartItemDto.fk_cart_item_product) 
      cartItem.product = await this.productService.findOne(updateCartItemDto.fk_cart_item_product);
    
    if (updateCartItemDto.quantity) 
      cartItem.quantity = updateCartItemDto.quantity;

    await this.cartItemRepository.save(cartItem);
    return this.findOne(id);
  }

  async remove(id: string) {
    const cartItem = await this.findOne(id);
    return this.cartItemRepository.remove(cartItem);
  }
}
