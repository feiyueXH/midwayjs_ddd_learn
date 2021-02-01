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
import { ICartCommandService } from '../../application/command/service/cart';
import { ICartQueryService } from '../../application/query/service/cart';
import { SaveCartItemDTO } from '../../infrastructure/dto/cart';
import { HttpHelper } from '../../infrastructure/http/helper';

@Provide()
@Controller('/carts')
export class CartController {
  @Inject()
  httpHelper: HttpHelper;

  @Inject()
  cartCommandService: ICartCommandService;

  @Inject()
  cartQueryService: ICartQueryService;

  @Get('/:userId')
  async getCart(@Param('userId') userId: string): Promise<void> {
    const cart = await this.cartQueryService.getCartBuyerId(userId);
    this.httpHelper.success(cart, '获取购物车成功');
  }

  @Post('/:userId/cartItems')
  async addCartItem(
    @Param('userId') userId: string,
    @Body(ALL) dto: SaveCartItemDTO
  ): Promise<void> {
    console.log(`userId:${userId}`);
    await this.cartCommandService.addCartItem(userId, dto);
    this.httpHelper.success(null, '添加购物车商品成功');
  }

  @Del('/:userId/cartItems/:productId')
  async removeCartItem(
    @Param('userId') userId: string,
    @Param('productId') productId: string
  ): Promise<void> {
    await this.cartCommandService.removeCartItem(userId, productId);
    this.httpHelper.success(null, '移除商品成功');
  }
}
