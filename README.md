# NESTJS - Buổi 12

## Seeder -> Tạo dữ liệu mẫu

Factory -> định nghĩa dữ liệu

1. Cấu hình orm cho seeder

**Lưu ý**: Cấu hình bao gồm các thông tin:

- Folder seeds, factories, entities

- Thông tin connect DB để sinh dữ liệu vào DB

- CLI script cần phải

```
module.exports = {
  seeds: ['src/databases/seeders/**/*{.ts,.js}'],
  factories: ['src/databases/factories/**/*{.ts,.js}'],
  entities: [__dirname + '/**/entities/**/*.entity{.ts,.js}'],
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: '111111',
  database: 'nestjs_buoi10',
};

```

## QueryBuilder

## Authentication

### Phương pháp 1 (Cũ): Session Base Authentication

-> Là StateFul -> Lưu trạng thái người dùng trên server

### Phương pháp 2 : Token Base Authentication

-> Là StateLess -> Không lưu trạng thái lên server -> Lưu ở đâu cũng được (Client - LocalStorage, Redis, Firebase, ...)
