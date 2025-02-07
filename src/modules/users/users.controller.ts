import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { TQueryFindAll } from 'src/types';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: Partial<CreateUserDto & { phone: string }>) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(@Query() query: TQueryFindAll) {
    const [users, total] = await this.usersService.findAll(query);
    return {
      data: users,
      total,
      currentPage: query._page ?? 1,
      totalPages: Math.ceil(total / query._limit),
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query() query: { includes: string, [key: string]: string }) {
    return this.usersService.findOne(+id, query);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string) {

    console.log('deleteOne - id: ', id)

    const delCount = await this.usersService.deleteOne(+id);
    return {
      success: true,
      message: 'Xóa dữ liệu thành công',
      delCount
    }
  }

  @Delete()
  async remove(@Body() body: { ids: number[] }) {
    const { ids } = body;
    if (!Array.isArray(ids) || ids.length === 0) {
      throw new BadRequestException('Vui lòng truyền 1 mảng dữ liệu ids cần xóa');
    }
    const delCount = await this.usersService.deleteMany(body);
    if (!delCount) {
      return {
        success: false,
        message: 'Không tìm thấy dữ liệu cần xóa'
      }
    }

    return {
      success: true,
      message: 'Xóa dữ liệu thành công',
      delCount
    }
  }
}
