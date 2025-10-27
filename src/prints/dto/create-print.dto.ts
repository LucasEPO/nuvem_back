import { IsEnum, IsNotEmpty, IsString, IsUrl, MaxLength } from "class-validator";
import { PrintType } from "../entities/print.entity";

export class CreatePrintDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    name: string;
    
    @IsEnum(PrintType)
    @IsNotEmpty()
    type: PrintType;
    
    @IsUrl()
    @IsNotEmpty()
    @MaxLength(255)
    image_url: string;
}
