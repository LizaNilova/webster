import { Controller, Get, Param, UseGuards, Req } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RequestDto } from '../auth/dto/request.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Subscriptions')
@Controller('api/subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  // subscribe or unsubscribe 
  // http://localhost:8080/api/subscriptions/subscribeTo/:id
  @Get('/subscribeTo/:id')
  @UseGuards(JwtAuthGuard)
  async subscribe(@Req() request: RequestDto, @Param('id') id: number) {
    return {
      subscriptions: await this.subscriptionsService.subscribeTo(request.user.id, id),
      message: 'Success'
    }
  }
}
