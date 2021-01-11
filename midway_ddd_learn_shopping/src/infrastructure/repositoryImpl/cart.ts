import { Provide } from '@midwayjs/decorator';
import { Cart } from '../../domain/cart/aggregate/cart';
import { ICartRepository } from '../../domain/cart/repository/cart';
import { UUID } from '../util/uuid';

@Provide()
export class CartRepository implements ICartRepository {
  getByUserId(userId: UUID): Cart {
    throw new Error('Method not implemented.');
  }
  save(cart: Cart): void {
    throw new Error('Method not implemented.');
  }
  delete(id: UUID): void {
    throw new Error('Method not implemented.');
  }
  getById(id: UUID): Cart {
    throw new Error('Method not implemented.');
  }
}
