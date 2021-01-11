import { Cart } from '../../domain/cart/aggregate/cart';
import { UUID } from '../../infrastructure/util/uuid';

export interface CartAppService {
  getCart(userId: UUID): Cart;
  addCartItem(cartId: UUID, goodsId: UUID, num: number): void;
}
