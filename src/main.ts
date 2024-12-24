import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    /**
     * Lưu ý: exceptionFactory 
     * cần phải return về là 1 mảng các lỗi 
     * phải được bọc bởi HttpException hoặc dùng Built-in exception Nestjs (https://docs.nestjs.com/exception-filters#built-in-http-exceptions)
     * 
    */
    exceptionFactory: (errors: ValidationError[]) => {
      const formattedErrors = errors.map((err) => ({
        field: err.property,
        error: Object.values(err.constraints)[0],
      }));

      return new BadRequestException(formattedErrors);
    },
  }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
