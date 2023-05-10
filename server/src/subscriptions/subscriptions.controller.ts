import { Controller, Param, UseGuards, Req, BadRequestException, NotFoundException, UnauthorizedException, Res, Post } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RequestDto } from '../auth/dto/request.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('Subscriptions')
@Controller('api/subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) { }

  @ApiOperation({ summary: 'Update post' })
  @ApiOkResponse({
    description: 'Unsubscribed user from author', schema: {
      example: {
        "message": "remove subscription"
    }
    }
  })
  @ApiCreatedResponse({
    description: 'Subscribed user on author', schema: {
      example: {
        "message": "subscribed",
    }
    }
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
    schema: {
      example: new BadRequestException("You can't subscribe to yourself")
    }
  })
  @ApiNotFoundResponse({
    description: 'Not found user',
    schema: {
      example: new NotFoundException('Undefined user')
    }
  })
  @ApiUnauthorizedResponse({
    description: 'User unauthorized',
    schema: {
      example: new UnauthorizedException('User unauthorized')
    }
  })
  @Post('/subscribe/user/:id')
  @UseGuards(JwtAuthGuard)
  async subscribe(@Param('id') id: number, @Req() request: RequestDto, @Res() res: Response) {
    const result = await this.subscriptionsService.subscribeTo({ authorId: id, userId: request.user.id })
    res.status(result.status).json({message: result.message})
  }
}
