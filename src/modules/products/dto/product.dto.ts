import { IsArray, IsIn, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Length, MaxLength } from "class-validator";


const categories = ['electronics', 'furniture', 'clothing'];

export class ProductDto {
  @IsNotEmpty({ message: 'Tên sản phẩm không được để trống' })
  @Length(5, 50, { message: 'Tên sản phẩm phải từ 5 đến 50 ký tự' })
  name: string;

  @IsOptional()
  @Length(20, 200, { message: 'Mô tả sản phẩm phải từ 20 đến 200 ký tự' })
  description: string;

  @IsNumber({}, { message: 'Giá sản phẩm phải là số' })
  @IsPositive({ message: 'Giá sản phẩm phải lớn hơn 0' })
  price: number;

  @IsNotEmpty({ message: 'Danh mục sản phẩm không được để trống' })
  @IsIn(categories, {
    message: 'Sản phẩm cần phải thuộc một trong các danh mục cho phép: electronics, furniture, clothing.',
  })
  category: string;

  @IsOptional()
  @IsArray({ message: 'Tags phải là mảng dữ liệu' })
  @IsString({ each: true, message: 'Các giá trị trong mảng tags phải là chuỗi' })
  @MaxLength(10, { each: true, message: 'Các giá trị trong mảng tags tối đa 10 ký tự' })
  tags: string[];
}