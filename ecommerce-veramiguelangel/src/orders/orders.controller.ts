import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/orders.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import type { AuthenticatedRequest } from 'src/users/users.controller';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'Crear una nueva orden' })
  addOrder(@Req() req: AuthenticatedRequest, @Body() order: CreateOrderDto) {
    const loggedUserId = req.user.sub;

    if (order.userId !== loggedUserId) {
      throw new ForbiddenException('No podés crear órdenes para otro usuario');
    }

    return this.ordersService.addOrder(loggedUserId, order.productId);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  getOrder(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.getOrder(id);
  }
}
