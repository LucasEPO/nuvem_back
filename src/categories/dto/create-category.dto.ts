import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Camisetas' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;
}
