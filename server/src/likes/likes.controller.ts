import { Controller, Req, Res, UseGuards, Param, ForbiddenException, NotFoundException, UnauthorizedException, Post } from '@nestjs/common';
import { LikesService } from './likes.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { RequestDto } from '../auth/dto/request.dto';
import { Response } from 'express';
@ApiTags('Likes')
@Controller('api/likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) { }

  @ApiOperation({ summary: 'delete category by id (only admin)' })
  @ApiCreatedResponse({
    description: 'Create like', schema: {
      example: {
        "message": "like"
      }
    }
  })
  @ApiOkResponse({
    description: 'Delete like', schema: {
      example: {
        "message": "remove like"
      }
    }
  })
  @ApiNotFoundResponse({
    description: 'Not found post',
    schema: {
      example: new NotFoundException('Post undefined')
    }
  })
  @ApiUnauthorizedResponse({
    description: 'User unauthorized',
    schema: {
      example: new UnauthorizedException('User unauthorized')
    }
  })
  @UseGuards(JwtAuthGuard)
  @Post('/post/:id')
  async likePost(@Param('id') id: number, @Req() req: RequestDto, @Res() res: Response) {
    const result = await this.likesService.likePost(id, req.user.id)
    res.status(result.status).json({ message: result.message })
  }
}

