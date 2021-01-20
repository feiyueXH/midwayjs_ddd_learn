import { SaveCartItemDTO } from '../../infrastructure/dto/cart';
import { CartVO } from '../../infrastructure/vo/cart';

export interface ICartAppService {
  getCartBuyerId(buyerId: string): Promise<CartVO>;
  addCartItem(cartId: string, dto: SaveCartItemDTO): Promise<void>;
  removeCartItem(cartId: string, productId: string): Promise<void>;
}
