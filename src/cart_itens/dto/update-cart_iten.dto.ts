import { PartialType } from '@nestjs/swagger';
import { CreateCartItenDto } from './create-cart_iten.dto';

export class UpdateCartItenDto extends PartialType(CreateCartItenDto) {}
