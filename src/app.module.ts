import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './modules/products/products.module';
import { ProductsController } from './modules/products/products.controller';

@Module({
  imports: [ProductModule],
  controllers: [AppController, ProductsController],
  providers: [AppService],
})
export class AppModule { }
