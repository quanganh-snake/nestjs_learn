import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post as PostEntity } from 'src/modules/users/entities/post.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }

  @Get('user/:userId')
  async findByUser(@Param('userId') userId: string) {
    // Lấy được user
    const posts = await this.postsService.findByUser(+userId);
    if (!posts || posts.length === 0) {
      throw new NotFoundException('Post not found');
    }
    return posts;
  }

  @Post('user/:userId')
  async createPosstByUser(@Param('userId') userId: string, @Body() body: Partial<PostEntity>) {
    // Lấy được userId --> Lấy được user --> Thêm post
    return this.postsService.createPostByUser(+userId, body);
  }
}
