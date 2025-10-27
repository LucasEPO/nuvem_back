import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    private readonly usersService: UsersService,
  ) {}

  async create(createReviewDto: CreateReviewDto) {    
    const user = await this.usersService.findOne(createReviewDto.fk_review_user);
    
    if (!user) 
      throw new NotFoundException(`Usuário com id ${createReviewDto.fk_review_user} não encontrado.`);

    const review = this.reviewRepository.create(createReviewDto);

    return await this.reviewRepository.save(review);
  }

  async findAll() {
    return await this.reviewRepository.find();
  }

  async findOne(id: number) {
    const review = await this.reviewRepository.findOne({ where: {review_id: id} });
    
    if(!review)
      throw new NotFoundException(`Review #${id} não encontrada`);

    return review;
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    if (Object.keys(updateReviewDto).length === 0)
      throw new BadRequestException(`Nenhum campo foi passado para atualização`);
    
    await this.reviewRepository.update(id, updateReviewDto);
    
    return this.findOne(id);
  }

  async remove(id: number) {
    const review = await this.findOne(id);
    
    return this.reviewRepository.remove(review);
  }
}
