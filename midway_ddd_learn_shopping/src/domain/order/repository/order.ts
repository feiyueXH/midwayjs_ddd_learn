import { Order } from '../aggregate/order';

export interface IProductRepository {
  getById(orderId: string): Promise<Order>;
  list(filter: any): Promise<Order>;
  add(product: Order): Promise<boolean>;
  update(product: Order): Promise<boolean>;
  remove(product: Order): Promise<boolean>;
  removeById(orderId: string): Promise<boolean>;
}
