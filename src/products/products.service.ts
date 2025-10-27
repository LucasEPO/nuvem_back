import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CollectionsService } from 'src/collections/collections.service';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly collectionService: CollectionsService,
    private readonly categoryService: CategoriesService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const existing = await this.productRepository.findOne({
      where: { name: createProductDto.name }
    });

    if(existing)
      throw new BadRequestException('Nome de produto já cadastrado');

    const [collection, category] = await Promise.all([
      this.collectionService.findOne(createProductDto.fk_product_category),
      this.categoryService.findOne(createProductDto.fk_product_category)
    ]);
    
    if (!collection) 
      throw new NotFoundException('Coleção não encontrada');
    if (!category) 
      throw new NotFoundException('Categoria não encontrada');

    const product = this.productRepository.create(createProductDto);

    return await this.productRepository.save(product);
  }

  async findAll() {
    return await this.productRepository.find();
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOne({
      where: { product_id: id }
    });

    if(!product)
      throw new NotFoundException(`Produto #${id} não encontrado`);

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    await this.findOne(id);

    if(updateProductDto.name) {
      const existing = await this.productRepository.findOne({
        where: { name: UpdateProductDto.name }
      });

      if(existing && existing.product_id !== id)
        throw new BadRequestException('Nome de produto já cadastrado');
    }

    const validations: Promise<any>[] = [];

    if (updateProductDto.fk_product_category) {
      validations.push(
        this.categoryService
          .findOne(updateProductDto.fk_product_category)
          .then(category => {
            if (!category)
              throw new NotFoundException('Categoria não encontrada');
          }),
      );
    }

    if (updateProductDto.fk_product_collection) {
      validations.push(
        this.collectionService
          .findOne(updateProductDto.fk_product_collection)
          .then(collection => {
            if (!collection)
              throw new NotFoundException('Coleção não encontrada');
          }),
      );
    }

    if (validations.length > 0) await Promise.all(validations);
    
    await this.productRepository.update(id, updateProductDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    return this.productRepository.remove(product);
  }
}
