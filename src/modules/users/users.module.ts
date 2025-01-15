import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from 'src/modules/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhonesModule } from 'src/modules/phones/phones.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PhonesModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule { }
