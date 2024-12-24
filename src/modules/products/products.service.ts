import { Injectable } from '@nestjs/common';
import { writeFile } from 'fs/promises';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { CreateProductDto } from 'src/modules/products/dto/create-product.dto';
import { UpdateProductDto } from 'src/modules/products/dto/update-product.dto';
import { Product } from 'src/types/product';

@Injectable()
export class ProductsService {
  private readonly dbPath = join(__dirname, '../../../db.json')

  private async readDataProducts(): Promise<{
    products: Product[];
    dbProducts: any;
  }> {
    try {
      const data = await readFile(this.dbPath, 'utf-8');
      const db = JSON.parse(data);
      return {
        products: db.products || [],
        dbProducts: db
      };
    } catch (error) {
      throw new Error('Không thể đọc file db.json: ' + error);
    }
  }

  // 1. Lấy danh sách products
  async getAll(): Promise<Product[]> {
    try {
      const { products } = await this.readDataProducts()
      return products || []
    } catch {
      return []
    }
  }

  // 2. Lấy chi tiết product
  async getDetail(id: string): Promise<Product | null> {
    try {
      const { products } = await this.readDataProducts()
      const product = products.find((p: Product) => p.id === id);
      if (!product) return null
      return product
    } catch {
      return null
    }
  }

  // 3. Thêm mới product và trả về danh sách products
  async create(product: CreateProductDto): Promise<{ success: boolean; message?: string }> {
    try {
      const { products, dbProducts } = await this.readDataProducts();

      // TODO 1: Tạo sản phẩm mới với ID duy nhất
      const newProduct = {
        ...product,
        id: new Date().getTime().toString(),
      };

      // TODO 2: Thêm sản phẩm mới vào danh sách
      products.push(newProduct);

      // TODO 3: Ghi lại dữ liệu vào file JSON
      dbProducts.products = products;
      await writeFile(this.dbPath, JSON.stringify(dbProducts, null, 2), 'utf-8');

      return { success: true };
    } catch (error) {
      console.error('Error creating product:', error);
      return { success: false, message: 'Internal server error' };
    }
  }

  // 4. Sửa thông tin product theo id và trả về danh sách products
  async update(id: string, product: UpdateProductDto): Promise<{ success: boolean; message?: string }> {
    try {
      const { products, dbProducts } = await this.readDataProducts()
      const index = products.findIndex((p: Product) => p.id === id);

      products[index] = {
        ...products[index],
        ...product
      };
      await writeFile(this.dbPath, JSON.stringify(dbProducts, null, 2), 'utf-8');
      return {
        success: true,
      }
    } catch (error) {
      console.error('Error creating product:', error);
      return { success: false, message: 'Internal server error' };
    }
  }

  // 5. Xóa product theo id và trả về danh sách products sau khi đã xóa
  async delete(id: string): Promise<{
    success: boolean;
    message?: string;
  }> {
    try {
      const { products, dbProducts } = await this.readDataProducts()
      const index = products.findIndex((p: Product) => p.id === id);

      if (products[index].category.includes('electronics')) {
        return {
          success: false,
          message: 'Không thể xóa sản phẩm thuộc danh mục electronics'
        }
      }

      products.splice(index, 1);
      await writeFile(this.dbPath, JSON.stringify(dbProducts, null, 2), 'utf-8');
      return {
        success: true,
      };
    } catch (error) {
      console.error('Error creating product:', error);
      return { success: false, message: `Internal server error, ${error}` };
    }
  }

}
