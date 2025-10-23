import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async create(createReviewDto: CreateReviewDto) {
    const review = this.reviewRepository.create(createReviewDto);

    return await this.reviewRepository.save(review);
  }

  findAll() {
    return this.reviewRepository.find();
  }

  async findOne(id: number) {
    const review = await this.reviewRepository.findOne({ where: {review_id: id} });
    
    if(!review)
      throw new NotFoundException(`Review #${id} não encontrada`);

    return review;
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    await this.reviewRepository.update(id, updateReviewDto);
    
    return this.findOne(id);
  }

  async remove(id: number) {
    const review = await this.findOne(id);
    
    return this.reviewRepository.remove(review);
  }
}
