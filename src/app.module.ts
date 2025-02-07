import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './modules/products/products.module';
import { ProductsController } from './modules/products/products.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { User } from 'src/modules/users/entities/user.entity';
import { Phone } from 'src/modules/users/entities/phone.entity';
import { PhonesModule } from './modules/phones/phones.module';
import { Post } from 'src/modules/users/entities/post.entity';
import { PostsModule } from './modules/posts/posts.module';
@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [User, Phone, Post],
    synchronize: process.env.NODE_ENV === 'development' || !process.env.NODE_ENV,
    logging: process.env.NODE_ENV === 'development' || !process.env.NODE_ENV,
    autoLoadEntities: true
  }), ProductModule, UsersModule, PhonesModule, PostsModule],
  controllers: [AppController, ProductsController],
  providers: [AppService],
})
export class AppModule { }
