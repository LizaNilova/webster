import { Controller, Get, Request, UseGuards, Param } from '@nestjs/common';
import { LikesService } from './likes.service';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RequestUserDto } from '../users/dto/request-user.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Likes')
@Controller('api/likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) { }

  // make or remove like
  // http://localhost:8080/api/likes/post/:id
  @UseGuards(JwtAuthGuard)
  @Post('/post/:id')
  async likePost(@Param('id') id: number, @Req() req: RequestDto, @Res() res: Response) {
    const result = await this.likesService.likePost(id, req.user.id)
    res.status(result.status).json({ message: result.message })
  }
}
