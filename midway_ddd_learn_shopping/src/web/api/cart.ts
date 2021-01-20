import {
  Controller,
  Del,
  Get,
  Inject,
  Post,
  Provide,
  Query,
} from '@midwayjs/decorator';
import { CartAppService } from '../../application/service/impl/cart';
import { SaveCartItemDTO } from '../../infrastructure/dto/cart';
import { CartVO } from '../../infrastructure/vo/cart';

@Provide()
@Controller('/cart')
export class CartController {
  @Inject()
  cartAppService: CartAppService;

  @Get('/:userId')
  async getCart(@Query('userId') userId: string): Promise<CartVO> {
    return await this.cartAppService.getCartBuyerId(userId);
  }

  @Post('/:userId/cartItem')
  async addCartItem(
    @Query('userId') userId: string,
    dto: SaveCartItemDTO
  ): Promise<void> {
    return await this.cartAppService.addCartItem(userId, dto);
  }

  @Del('/:userId/cartItem/:itemId')
  async removeCartItem(
    @Query('userId') userId: string,
    @Query('pruductId') pruductId: string
  ): Promise<void> {
    await this.cartAppService.removeCartItem(userId, pruductId);
  }
}
