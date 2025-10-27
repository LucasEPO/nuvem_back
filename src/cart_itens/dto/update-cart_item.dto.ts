import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateCartItemDto } from './create-cart_item.dto';

export class UpdateCartItemDto extends PartialType(
  OmitType(CreateCartItemDto, ['fk_cart_item_cart'] as const),
) {}
