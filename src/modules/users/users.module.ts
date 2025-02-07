import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from 'src/modules/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhonesModule } from 'src/modules/phones/phones.module';
import { PostsModule } from 'src/modules/posts/posts.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PhonesModule, PostsModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule { }
