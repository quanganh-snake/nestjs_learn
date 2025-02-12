import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/entities/post.entity';
import { Category } from 'src/entities/category.entity';
import { CategoriesModule } from './modules/categories/categories.module';
import { PostsModule } from './modules/posts/posts.module';
@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [Post, Category],
    synchronize: process.env.NODE_ENV === 'development' || !process.env.NODE_ENV,
    logging: process.env.NODE_ENV === 'development' || !process.env.NODE_ENV,
    autoLoadEntities: true
  }), CategoriesModule, PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
