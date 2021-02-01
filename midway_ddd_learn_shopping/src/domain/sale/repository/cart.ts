import { Cart } from '../model/cart/cart';

export interface ICartRepository {
  getById(id: string): Promise<Cart>;
  save(cart: Cart): Promise<boolean>;
  remove(cart: Cart): Promise<boolean>;
  getByBuyerId(buyId: string): Promise<Cart>;
}
