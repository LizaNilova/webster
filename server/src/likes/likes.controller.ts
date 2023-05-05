import { Controller, Get, Request, UseGuards, Param } from '@nestjs/common';
import { LikesService } from './likes.service';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RequestUserDto } from '../users/dto/request-user.dto';

@Controller('api/likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  // make or remove like
  // http://localhost:8080/likes/post/:id
  @UseGuards(JwtAuthGuard)
  @Get('/post/:id')
  update(@Param('id') id: number, @Request() req: { user: RequestUserDto }) {
    return this.likesService.update(id, req.user.id);
  }
}
