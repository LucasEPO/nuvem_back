import { PartialType } from '@nestjs/swagger';
import { CreatePrintDto } from './create-print.dto';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdatePrintDto extends PartialType(CreatePrintDto) {
    @IsOptional()
    @IsString()
    @MaxLength(10)
    code?: string;
}
