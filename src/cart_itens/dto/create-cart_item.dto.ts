import { IsInt, IsUUID } from "class-validator";

export class CreateCartItemDto {
    @IsInt()
    quantity: number;

    @IsUUID('4')
    fk_cart_iten_print: string;
    
    @IsUUID('4')
    fk_cart_iten_product: string;
    
    @IsUUID('4')
    fk_cart_iten_cart: string;
}
