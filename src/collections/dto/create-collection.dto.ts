import { IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength } from "class-validator";

export class CreateCollectionDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    name: string;
    
    @IsOptional()
    @IsUrl()
    @MaxLength(255)
    image_url?: string;
    
    @IsOptional()
    @IsUrl()
    @MaxLength(255)
    logo_url?: string;
}
