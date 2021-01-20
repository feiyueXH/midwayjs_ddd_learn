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
import { CartAppService } from '../../application/service/impl/cart';
import { SaveCartItemDTO } from '../../infrastructure/dto/cart';
import { CartVO } from '../../infrastructure/vo/cart';

@Provide()
@Controller('/carts')
export class CartController {
  @Inject()
  cartAppService: CartAppService;

  @Get('/:userId')
  async getCart(@Param('userId') userId: string): Promise<CartVO> {
    return await this.cartAppService.getCartBuyerId(userId);
  }

  @Post('/:userId/cartItems')
  async addCartItem(
    @Param('userId') userId: string,
    @Body(ALL) dto: SaveCartItemDTO
  ): Promise<string> {
    console.log(`userId:${userId}`);
    await this.cartAppService.addCartItem(userId, dto);
    return '添加购物车商品成功!';
  }

  @Del('/:userId/cartItems/:productId')
  async removeCartItem(
    @Param('userId') userId: string,
    @Param('productId') productId: string
  ): Promise<string> {
    await this.cartAppService.removeCartItem(userId, productId);
    return '移除商品成功!';
  }
}
