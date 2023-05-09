import { Controller, Get, Param, UseGuards, Req } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RequestDto } from '../auth/dto/request.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Subscriptions')
@Controller('api/subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

    }
  @Post('/subscribe/user/:id')
  @UseGuards(JwtAuthGuard)
  async subscribe(@Param('id') id: number, @Req() request: RequestDto, @Res() res: Response) {
    const result = await this.subscriptionsService.subscribeTo({ authorId: id, userId: request.user.id })
    res.status(result.status).json({message: result.message})
  }
}
