import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
    const existing = await this.userRepository.findOne({
      where: { email: createUserDto.email } 
    });

    if (existing) 
      throw new BadRequestException('E-mail já está em uso');

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
    return await this.userRepository.findOne({ where: { email } });
  }

  async updateByEmail(email: string, updateUserDto: UpdateUserDto) {
    await this.userRepository.update({ email }, updateUserDto);

    return await this.userRepository.findOne({ where: { email } });
  }

  async removeByEmail(email: string) {
    const user = await this.findOneByEmail(email);

    if (user) 
      await this.userRepository.remove(user);

    return user;
  }
}
