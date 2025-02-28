import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/entities/post.entity';
import { Category } from 'src/entities/category.entity';
import { CategoriesModule } from './modules/categories/categories.module';
import { PostsModule } from './modules/posts/posts.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import typeorm from 'src/config/typeorm';
import { JwtModule } from '@nestjs/jwt';
// Buoi 15 - Email
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    MailerModule.forRoot({
      transport: `${process.env.MAIL_PORT === '465' ? 'smtps' : 'smtp'}://${process.env.MAIL_USERNAME}:${process.env.MAIL_PASSWORD}@${process.env.MAIL_HOST}`, // Thông tin SMTP
      defaults: {
        from: '"TB Quang Anh" <tbquanganh@gmail.com>', // Tên địa chỉ gửi
      },
      // template: {
      //   dir: __dirname + '/templates',
      //   adapter: new EjsAdapter(),
      //   options: {
      //     strict: true,
      //   },
      // },
    }),
    PostsModule,
    CategoriesModule,
    UsersModule,
    AuthModule,
    JwtModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
