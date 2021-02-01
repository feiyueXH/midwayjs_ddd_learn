import { CartVO } from '../../../infrastructure/vo/cart';

export interface ICartQueryService {
  getCartBuyerId(buyerId: string): Promise<CartVO>;
}
