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

    const product = this.productRepository.create({
      ...createProductDto,
      collection,
      category
    });

    return await this.productRepository.save(product);
  }

  async findAll() {
    return await this.productRepository.find({
      relations:['category', 'collection'],
      select: {
        category: { category_id: true, name: true },
        collection: { collection_id: true, name: true },  
      },
    });
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOne({
      where: { product_id: id },
      relations: ['category', 'collection']
    });

    if(!product)
      throw new NotFoundException(`Produto #${id} não encontrado`);

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    let product = await this.findOne(id);

    if(updateProductDto.name) {
      const existing = await this.productRepository.findOne({
        where: { name: UpdateProductDto.name }
      });

      if(existing && existing.product_id !== id)
        throw new BadRequestException('Nome de produto já cadastrado');
    }

    if(updateProductDto.fk_product_category)
      product.category = await this.categoryService.findOne(updateProductDto.fk_product_category);
    
    if(updateProductDto.fk_product_collection)
      product.collection = await this.collectionService.findOne(updateProductDto.fk_product_collection);
    
    Object.keys(updateProductDto).forEach(key => {
      console.log(key);
      if(key !== 'collection' && key !== 'category' )
        product[key] = updateProductDto[key]
    })
    await this.productRepository.save(product);
    return this.findOne(id);
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    return this.productRepository.remove(product);
  }
}
