import { Order } from '../model/order/order';

export interface IOrderRepository {
  getById(orderId: string): Promise<Order>;
  list(filter: any): Promise<Order>;
  save(product: Order): Promise<boolean>;
  remove(product: Order): Promise<boolean>;
  removeById(orderId: string): Promise<boolean>;
}
