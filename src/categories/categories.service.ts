import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const existing = await this.categoryRepository.findOne({
      where: { name: createCategoryDto.name },
    });

    if (existing)
      throw new ConflictException(`A categoria "${createCategoryDto.name}" já existe.`);
    
    const category = this.categoryRepository.create(createCategoryDto);

    return this.categoryRepository.save(category);
  }

  findAll() {
    return this.categoryRepository.find();
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOne({ where: { category_id: id } });

    if (!category) 
      throw new NotFoundException(`Categoria #${id} não encontrada`);

    return category;
  }

  async findOneByName(name: string) {
    const category = await this.categoryRepository.findOne({ where: { name } });

    if (!category) 
      throw new NotFoundException(`Categoria ${name} não encontrada`);

    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    if (Object.keys(updateCategoryDto).length === 0)
      throw new BadRequestException(`Nenhum campo foi passado para atualização`);

    if(updateCategoryDto.name) {
      const existing = await this.categoryRepository.findOne({
        where: { name: updateCategoryDto.name }
      });
      
      if(existing)
        throw new ConflictException(`A categoria "${updateCategoryDto.name}" já existe.`);
    }

    await this.categoryRepository.update(id, updateCategoryDto);

    return this.findOne(id);
  }

  async remove(id: number) {
    const category = await this.findOne(id);
    return this.categoryRepository.remove(category);
  }
}
