import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateCartDto } from './create-cart.dto';

export class UpdateCartDto extends PartialType(
  OmitType(CreateCartDto, ['fk_cart_user'] as const),
) {}
