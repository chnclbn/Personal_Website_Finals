import { Controller, Get, Post, Body } from '@nestjs/common';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  getComments() { return this.commentsService.getComments(); }

  @Post()
  postComment(@Body() body: { name: string; rating: number; comment: string }) {
    return this.commentsService.postComment(body);
  }
}
