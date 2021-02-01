import { IOrderRepository } from '../../../domain/sale/repository/order';
import { IEventBus } from '../../../infrastructure/core/ddd/event';

export interface ICreateOrderHandler {
  id: string;
  eventBus: IEventBus;
  orderRepository: IOrderRepository;
}
