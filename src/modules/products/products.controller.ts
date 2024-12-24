import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, InternalServerErrorException, NotAcceptableException, NotFoundException, Param, Patch, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateProductDto } from 'src/modules/products/dto/create-product.dto';
import { UpdateProductDto } from 'src/modules/products/dto/update-product.dto';
import { ProductsService } from 'src/modules/products/products.service';

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
  async getDetail(@Param('id') id: string) {
    const product = await this.productsService.getDetail(id);
    if (!product) {
      throw new NotFoundException(`Không tìm thấy sản phẩm có mã ${id}`);
    }
    return product;
  }

  // 3. Thêm mới product và trả về danh sách products
  @Post()
  async create(@Body() body: CreateProductDto, @Res() res: Response) {
    const result = await this.productsService.create(body);

    if (!result.success) {
      if (result.message === 'Internal server error') {
        throw new InternalServerErrorException(result.message);
      } else {
        throw new BadRequestException(result.message || 'Invalid data');
      }
    }

    return res.status(HttpStatus.CREATED).json({
      message: 'Thêm sản phẩm thành công',
      product: body,
      products: await this.productsService.getAll(),
    });
  }
  // 4. Sửa thông tin product theo id và trả về danh sách products
  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateProductDto, @Res() res: Response) {
    const product = await this.productsService.getDetail(id);
    if (!product) {
      throw new NotFoundException(`Không tìm thấy sản phẩm có mã ${id}`);
    }

    const update = await this.productsService.update(id, body);
    if (!update.success) {
      if (update.message === 'Internal server error') {
        throw new InternalServerErrorException(update.message);
      } else {
        throw new BadRequestException(update.message || 'Invalid data');
      }
    }
    return res.status(HttpStatus.OK).json({
      message: 'Cập nhật sản phẩm thành công',
      product: body,
      products: await this.productsService.getAll(),
    });
  }

  // 5. Xóa product theo id và trả về danh sách products sau khi đã xóa
  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    const product = await this.productsService.getDetail(id);
    if (!product) {
      throw new NotFoundException(`Không tìm thấy sản phẩm có mã ${id}`);
    }

    const deleteProduct = await this.productsService.delete(id);
    if (!deleteProduct.success) {
      if (deleteProduct.message === 'Internal server error') {
        throw new InternalServerErrorException(deleteProduct.message);
      } else {
        throw new NotAcceptableException(deleteProduct.message || 'Invalid data');
      }
    }

    return res.status(HttpStatus.OK).json({
      message: 'Xóa sản phẩm thành công',
      products: await this.productsService.getAll(),
    });
  }
}
