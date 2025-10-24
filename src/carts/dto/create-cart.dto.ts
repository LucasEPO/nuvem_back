import { IsUUID } from "class-validator";

export class CreateCartDto {
    @IsUUID('4')
    fk_cart_user: string;
}
