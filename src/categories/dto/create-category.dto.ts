import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Camisetas' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @IsOptional()
  @IsUrl()
  @MaxLength(255)
  image_url?: string;
}
