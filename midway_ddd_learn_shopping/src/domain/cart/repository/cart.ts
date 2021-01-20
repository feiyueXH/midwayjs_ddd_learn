import { Cart } from '../aggregate/cart';

export interface ICartRepository {
  getById(id: string): Promise<Cart>;
  add(user: Cart): Promise<boolean>;
  update(user: Cart): Promise<boolean>;
  remove(cart: Cart): Promise<boolean>;
  getByBuyerId(buyId: string): Promise<Cart>;
}
