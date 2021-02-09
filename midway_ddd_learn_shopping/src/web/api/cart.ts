import {
  ALL,
  Body,
  Controller,
  Del,
  Get,
  Inject,
  Param,
  Post,
  Provide,
} from '@midwayjs/decorator';
import { AddCartItemCommand } from '../../application/command/sale/impl/add-cart-item.command';
import { RemoveCartItemCommand } from '../../application/command/sale/impl/remove-cart-item.command';
import { GetCartDetailQuery } from '../../application/query/sale/impl/get-cart-detail.query';
import { HttpHelper } from '../../infrastructure/common/http/helper';
import { ICommandBus } from '../../infrastructure/core/command-bus';
import { IQueryBus } from '../../infrastructure/core/query-bus';
import { SaveCartItemDTO } from '../dto/cart';

@Provide()
@Controller('/carts')
export class CartController {
  @Inject()
  httpHelper: HttpHelper;

  @Inject()
  commandBus: ICommandBus;

  @Inject()
  queryBus: IQueryBus;

  @Get('/:userId')
  async getCart(@Param('userId') userId: string): Promise<void> {
    const cart = await this.queryBus.send(new GetCartDetailQuery(userId));
    this.httpHelper.success(cart, '获取购物车成功');
  }

  @Post('/:userId/cartItems')
  async addCartItem(
    @Param('userId') userId: string,
    @Body(ALL) dto: SaveCartItemDTO
  ): Promise<void> {
    await this.commandBus.send(
      new AddCartItemCommand(userId, dto.productId, dto.count)
    );
    this.httpHelper.success(null, '添加购物车商品成功');
  }

  @Del('/:userId/cartItems/:productId')
  async removeCartItem(
    @Param('userId') userId: string,
    @Param('productId') productId: string
  ): Promise<void> {
    await this.commandBus.send(new RemoveCartItemCommand(userId, productId));
    this.httpHelper.success(null, '移除商品成功');
  }
}
