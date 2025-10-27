import { IsInt, IsNumber, IsOptional, IsUUID } from "class-validator";

export class CreateCartItemDto {
    @IsOptional()
    @IsInt()
    quantity: number;

    @IsOptional()
    @IsNumber()
    fk_cart_item_print: number;
    
    @IsOptional()
    @IsUUID('4')
    fk_cart_item_product: string;
    
    @IsUUID('4')
    fk_cart_item_cart: string;
}
