import { Controller, Request, Post, Body, Patch, Param, Delete, UseGuards, NotFoundException, UnauthorizedException, UsePipes, ForbiddenException } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { RequestDto } from '../auth/dto/request.dto';
import { ValidationPipe } from '../pipes/validation.pipe';
@ApiTags('Comments')
@Controller('api/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }

  @ApiOperation({ summary: 'Create comment' })
  @ApiCreatedResponse({
    description: 'Create comment', schema: {
      example: {
        "comment": {
          "id": 3,
          "value": "I love this",
          "userId": 3,
          "postId": 2,
          "updatedAt": "2023-05-09T13:34:20.296Z",
          "createdAt": "2023-05-09T13:34:20.296Z"
        },
        "message": "Create comment"
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
    schema: {
      example: {
        "value": {
          "value": "undefined",
          "constraints": [
            "Should be a string"
          ]
        }
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
  @UsePipes(ValidationPipe)
  @Post('/post/:id')
  async create(@Param('id') id: number, @Body() dto: CreateCommentDto, @Request() req: RequestDto) {
    return {
      comment: await this.commentsService.create({ ...dto, userId: req.user.id, postId: id }),
      message: 'Create comment'
    }
  }

  @ApiOperation({ summary: 'Update comment' })
  @ApiOkResponse({
    description: 'Update comment', schema: {
      example: {
        "comment": {
          "id": 3,
          "value": "I love this cat",
          "postId": 2,
          "userId": 3,
          "createdAt": "2023-05-09T13:34:20.296Z",
          "updatedAt": "2023-05-09T13:44:14.160Z"
        },
        "message": "Update comment"
      }
    }
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
    schema: {
      example: {
        "value": {
          "value": "undefined",
          "constraints": [
            "Should be a string"
          ]
        }
      }
    }
  })
  @ApiNotFoundResponse({
    description: 'Not found comment',
    schema: {
      example: new NotFoundException('Comment with ID ${commentId} not found')
    }
  })
  @ApiUnauthorizedResponse({
    description: 'User unauthorized',
    schema: {
      example: new UnauthorizedException('User unauthorized')
    }
  })
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateCommentDto, @Request() req: RequestDto) {
    return {
      comment: await this.commentsService.update({ commentId: id, userId: req.user.id, value: dto.value }),
      message: 'Update comment'
    }
  }

  @ApiOperation({ summary: 'Delete comment' })
  @ApiOkResponse({
    description: 'Detele comment', schema: {
      example: {
        "message": "Comment was deleted"
      }
    }
  })
  @ApiNotFoundResponse({
    description: 'Not found comment',
    schema: {
      example: new NotFoundException('Comment with ID ${commentId} not found')
    }
  })
  @ApiUnauthorizedResponse({
    description: 'User unauthorized',
    schema: {
      example: new UnauthorizedException('User unauthorized')
    }
  })
  @ApiForbiddenResponse({
    description: 'Forbidden.', schema: {
      example: new ForbiddenException('User no create this comment')
    }
  })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req: RequestDto) {
    return {
      message: await this.commentsService.remove(id, req.user.id)
    }
  }
}
