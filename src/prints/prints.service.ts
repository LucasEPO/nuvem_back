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
    const newCode = await this.createCode(createPrintDto.type);

    const print = this.printRepository.create({
      ...createPrintDto,
      code: newCode,
    });
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
    delete updatePrintDto.code;
    if (Object.keys(updatePrintDto).length === 0)
      throw new BadRequestException(`Nenhum campo foi passado para atualização`);

    if(updatePrintDto.type) {
      const newCode = await this.createCode(updatePrintDto.type);
      updatePrintDto.code = newCode;
    }

    const notEmptyFields = ["name", "image_url"];

    Object.keys(updatePrintDto).forEach(key => {
      if (notEmptyFields.includes(key)) {
        if (updatePrintDto[key].length === 0) 
          throw new BadRequestException(`Campo ${key} precisa de valor`);
      }
    });
    
    await this.printRepository.update(id, updatePrintDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const print = await this.findOne(id);
    
    return this.printRepository.remove(print);
  }

  async createCode(type: PrintType): Promise<string> {
    const prefixMapCode = {
      ANIME: 'ANM',
      GEEK: 'GEEK',
      EXCLUSIVA: 'EXC'
    }

    const prefix = prefixMapCode[type];
    if(!prefix) 
      throw new BadRequestException(`Tipo de estampa inválido: ${type}`);

    const lastPrint = await this.printRepository.findOne({
      where: { type: type },
      order: { code: 'DESC' },
    });

    let nextNumber = 1;
    if (lastPrint && lastPrint.code) {
      const lastNumber = parseInt(lastPrint.code.split('-')[1]);
      if (!isNaN(lastNumber)) 
        nextNumber = lastNumber + 1;
    }

    const code = `${prefix}-${nextNumber.toString().padStart(4, '0')}`;
    return code;
  }
}
