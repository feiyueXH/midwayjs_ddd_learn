import { IProductRepository } from '../../../domain/product/repository/product';
import { ICartRepository } from '../../../domain/sale/repository/cart';
import { IOrderRepository } from '../../../domain/sale/repository/order';
import { ICommandExecutorBase } from '../../../infrastructure/core/application/command';
import { IEventBus } from '../../../infrastructure/core/event-bus';

export interface ICreateOrderExecutor extends ICommandExecutorBase {
  eventBus: IEventBus;
  orderRepository: IOrderRepository;
}

export interface IAddCartItemExecutor extends ICommandExecutorBase {
  productRepository: IProductRepository;
  cartRepository: ICartRepository;
}

export interface IRemoveCartItemExecutor extends ICommandExecutorBase {
  cartRepository: ICartRepository;
}
