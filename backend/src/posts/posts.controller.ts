import { Body, Controller, Get, Post as HttpPost, Request, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @HttpPost()
  async create(@Request() req, @Body() body: { title: string; description: string }) {
    return this.postsService.create(req.user.userId, body.title, body.description);
  }

  @UseGuards(JwtAuthGuard)
  @Get('feed')
  async getFeed(@Request() req) {
    return this.postsService.getTimeline(req.user.userId);
  }
}
