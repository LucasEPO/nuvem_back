import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUrl, IsUUID } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    price: number;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    quantity: number;

    @IsOptional()
    @IsUrl()
    image_url?: string;

    @IsOptional()
    @IsString()
    size?: string;

    @IsNotEmpty()
    @IsNumber()
    fk_product_collection: number;

    @IsNotEmpty()
    @IsNumber()
    fk_product_category: number;
}
