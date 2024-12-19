import { Injectable } from '@nestjs/common';
import { writeFile } from 'fs/promises';
import { readFile } from 'fs/promises';
import { join } from 'path';
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
  async getAll(): Promise<{
    statusCode: number;
    message: string;
    products: Product[];
  }> {
    try {
      const { products } = await this.readDataProducts()
      return {
        statusCode: 200,
        message: 'Lấy danh sách products thành công',
        products: products || []
      };
    } catch (error) {
      throw new Error('Không có dữ liệu products từ file db.json' + error);
    }
  }

  // 2. Lấy chi tiết product
  async getDetail(id: string): Promise<{
    statusCode: number;
    message: string;
    product?: Product;
  }> {
    try {
      const { products } = await this.readDataProducts()
      const product = products.find((p: Product) => p.id === id);
      if (!product) {
        return {
          statusCode: 404,
          message: 'Không tìm thấy product',
        }
      }
      return {
        statusCode: 200,
        message: 'Lấy chi tiết product thành công',
        product: product
      };
    } catch (error) {
      throw new Error('Không có dữ liệu products từ file db.json' + error);
    }
  }

  // 3. Thêm mới product và trả về danh sách products
  async create(product: Product): Promise<{
    statusCode: number;
    message: string;
    products: Product[];
  }> {
    try {
      const { products, dbProducts } = await this.readDataProducts()

      // TODO: validate product ...
      const newProduct = {
        ...product,
        id: new Date().getTime().toString()
      }
      products.push(newProduct);
      await writeFile(this.dbPath, JSON.stringify(dbProducts, null, 2), 'utf-8');
      return {
        statusCode: 201,
        message: 'Thêm mới product thành công',
        products: products || []
      };
    } catch (error) {
      throw new Error('Method not implemented.' + error);
    }
  }
  // 4. Sửa thông tin product theo id và trả về danh sách products
  async update(id: string, product: Product): Promise<{
    statusCode: number;
    message: string;
    products: Product[];
  }> {
    try {
      const { products, dbProducts } = await this.readDataProducts()
      const index = products.findIndex((p: Product) => p.id === id);
      if (index === -1) {
        return {
          statusCode: 404,
          message: 'Không tìm thấy product để sửa',
          products: products || []
        }
      }
      products[index] = {
        ...products[index],
        ...product
      };
      await writeFile(this.dbPath, JSON.stringify(dbProducts, null, 2), 'utf-8');
      return {
        statusCode: 200,
        message: 'Sửa thông tin product thành công',
        products: products || []
      };
    } catch (error) {
      throw new Error('Method not implemented.' + error);
    }
  }

  // 5. Xóa product theo id và trả về danh sách products sau khi đã xóa
  async delete(id: string): Promise<{
    statusCode: number;
    message: string;
    products: Product[];
  }> {
    try {
      const { products, dbProducts } = await this.readDataProducts()
      const index = products.findIndex((p: Product) => p.id === id);
      if (index === -1) {
        return {
          statusCode: 404,
          message: 'Không tìm thấy product để xóa',
          products: products || []
        }
      }
      products.splice(index, 1);
      await writeFile(this.dbPath, JSON.stringify(dbProducts, null, 2), 'utf-8');
      return {
        statusCode: 200,
        message: 'Xóa product thành công',
        products: products || []
      };
    } catch (error) {
      throw new Error('Method not implemented.' + error);
    }
  }

}
