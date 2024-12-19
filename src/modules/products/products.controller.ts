import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProductsService } from 'src/modules/products/products.service';
import { Product } from 'src/types/product';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  // 1. Lấy danh sách products
  @Get()
  getAll() {
    return this.productsService.getAll();
  }

  // 2. Lấy chi tiết product
  @Get(':id')
  getDetail(@Param('id') id: string) {
    return this.productsService.getDetail(id);
  }

  // 3. Thêm mới product và trả về danh sách products
  @Post()
  create(@Body() body: Product) {
    return this.productsService.create(body);
  }
  // 4. Sửa thông tin product theo id và trả về danh sách products
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: Product) {
    return this.productsService.update(id, body);
  }

  // 5. Xóa product theo id và trả về danh sách products sau khi đã xóa
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productsService.delete(id);
  }
}
