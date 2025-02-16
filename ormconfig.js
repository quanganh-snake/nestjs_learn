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
