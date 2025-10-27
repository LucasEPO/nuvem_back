import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    createUserDto.email = createUserDto.email.toLowerCase();

    const existing = await this.userRepository.findOne({
      where: { email: createUserDto.email } 
    });

    if (existing) 
      throw new ConflictException('E-mail já está em uso');

    if(createUserDto.name.length === 0)
      throw new BadRequestException('Nome precisa ter um valor');
      
    const password_hash = await bcrypt.hash(createUserDto.password, 10);

    const user = this.userRepository.create({
      ...createUserDto,
      password_hash,
    });

    return await this.userRepository.save(user);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(user_id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { user_id: user_id },
    });

    if (!user) 
      throw new NotFoundException(`Usuário com ID ${user_id} não encontrado.`);
    
    return user;
  }

  async findOneByEmail(email: string) {
    email = email.toLowerCase();
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) 
      throw new NotFoundException(`Usuário com e-mail ${email} não encontrado.`);

    return user;
  }

  async updateByEmail(email: string, updateUserDto: UpdateUserDto) {
    email = email.toLowerCase();
    const notNullFields = ["name", "password"];

    if (Object.keys(updateUserDto).length === 0)
      throw new BadRequestException(`Nenhum campo foi passado para atualização`);

    if(updateUserDto.email) {
      const existing = await this.userRepository.findOne({
        where: { email: updateUserDto.email }
      });
  
      if(existing)
        throw new ConflictException(`E-mail já está em uso`);
    }

    Object.keys(updateUserDto).forEach(key => {
      if (notNullFields.includes(key)) {
        if (updateUserDto[key].length === 0) 
          throw new BadRequestException(`Campo ${key} precisa de valor`);
      }
    });

    await this.userRepository.update({ email }, updateUserDto);

    return await this.userRepository.findOne({ where: { email } });
  }

  async removeByEmail(email: string) {
    email = email.toLowerCase();
    const user = await this.findOneByEmail(email);

    if (user) 
      await this.userRepository.remove(user);

    return user;
  }
}
