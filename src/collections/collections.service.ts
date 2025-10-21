import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Collection } from './entities/collection.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CollectionsService {
  constructor(
    @InjectRepository(Collection)
    private readonly collectionRepository: Repository<Collection>,
  ) {}

  async create(createCollectionDto: CreateCollectionDto) {
    const existing = await this.collectionRepository.findOne({
      where: { name: createCollectionDto.name },
    });
    
    if (existing)
      throw new ConflictException(`A coleção "${createCollectionDto.name}" já existe.`);

    const collection = this.collectionRepository.create(createCollectionDto);
    return this.collectionRepository.save(collection);
  }

  findAll() {
    return this.collectionRepository.find();
  }

  async findOne(id: number) {
    const collection = await this.collectionRepository.findOne({ where: {collection_id: id} });

    if(!collection)
      throw new NotFoundException(`Coleção #${id} não encontrada`);

    return collection;
  }

  async findOneByName(name: string) {
    const collection = await this.collectionRepository.findOne({ where: { name } });

    if(!collection)
      throw new NotFoundException(`Coleção ${name} não encontrada`);

    return collection;
  }

  async update(id: number, updateCollectionDto: UpdateCollectionDto) {
    await this.collectionRepository.update(id, updateCollectionDto);
    
    return this.findOne(id);
  }

  async remove(id: number) {
    const category = await this.findOne(id);
    
    return this.collectionRepository.remove(category);
  }
}
