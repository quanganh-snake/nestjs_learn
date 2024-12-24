import { IsOptional } from "class-validator";
import { ProductDto } from "src/modules/products/dto/product.dto";

export class UpdateProductDto extends ProductDto {
  @IsOptional()
  name: string;

  @IsOptional()
  description: string;

  @IsOptional()
  price: number;

  @IsOptional()
  category: string;

  @IsOptional()
  tags: string[];
}