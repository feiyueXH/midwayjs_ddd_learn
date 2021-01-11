import { UUID } from '../../../infrastructure/util/uuid';
import { Cart } from '../aggregate/cart';

export interface ICartRepository {
  getByUserId(userId: UUID): Cart;
  save(cart: Cart): void;
  delete(id: UUID): void;
  getById(id: UUID): Cart;
}
