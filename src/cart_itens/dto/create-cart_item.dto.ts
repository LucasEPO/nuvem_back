import { IsInt, IsNumber, IsUUID } from "class-validator";

export class CreateCartItemDto {
    @IsInt()
    quantity: number;

    @IsNumber()
    fk_cart_item_print: number;
    
    @IsUUID('4')
    fk_cart_item_product: string;
    
    @IsUUID('4')
    fk_cart_item_cart: string;
}
