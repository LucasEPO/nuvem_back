import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePrintDto } from './dto/create-print.dto';
import { UpdatePrintDto } from './dto/update-print.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Print, PrintType } from './entities/print.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PrintsService {
  constructor(
    @InjectRepository(Print)
    private readonly printRepository: Repository<Print>,
  ) {}

  async create(createPrintDto: CreatePrintDto) {
    const existing = await this.printRepository.findOne({
      where: { code: createPrintDto.code },
    });
        
    if (existing)
      throw new ConflictException(`A estampa "${createPrintDto.code}" já existe.`);

    const validTypes = Object.values(PrintType);
    if (!validTypes.includes(createPrintDto.type))
      throw new BadRequestException(`Tipo inválido: "${createPrintDto.type}"`)

    const print = this.printRepository.create(createPrintDto);
    return this.printRepository.save(print);
  }

  findAll() {
    return this.printRepository.find();
  }

  async findOne(id: number) {
    const print = await this.printRepository.findOne({ where: {print_id: id} });
    
    if(!print)
      throw new NotFoundException(`Estampa #${id} não encontrada`);
    
    return print;
  }

  async findOneByCode(code: string) {
    const print = await this.printRepository.findOne({ where: { code } });
    
    if(!print)
      throw new NotFoundException(`Estampa #${code} não encontrada`);
    
    return print;
  }

  async update(id: number, updatePrintDto: UpdatePrintDto) {
    await this.printRepository.update(id, updatePrintDto);

    if (updatePrintDto.type !== undefined) {
      const validTypes = Object.values(PrintType);
      if (!validTypes.includes(updatePrintDto.type)) {
        throw new BadRequestException(`Tipo inválido: "${updatePrintDto.type}"`);
      }
    }
    return this.findOne(id);
  }

  async remove(id: number) {
    const print = await this.findOne(id);
    
    return this.printRepository.remove(print);
  }
}
