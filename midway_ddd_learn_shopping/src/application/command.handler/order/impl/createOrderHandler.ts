import { Inject, Provide } from '@midwayjs/decorator';
import { OrderCreatedEvent } from '../../../../domain/sale/event/orderCreatedEvent';
import { IOrderRepository } from '../../../../domain/sale/repository/order';
import {
  CommandBase,
  CommandHandlerBase,
} from '../../../../infrastructure/core/cqrs/command';
import { IEventBus } from '../../../../infrastructure/core/ddd/event';
import { SubscribeCommand } from '../../../../infrastructure/decorator/command';
import { CreateOrderCmd } from '../../../command/order/impl/createOrderCmd';
import { ICreateOrderHandler } from '../createOrderHandler';

@SubscribeCommand(CreateOrderCmd)
@Provide()
export class CreateOrderHandler
  extends CommandHandlerBase
  implements ICreateOrderHandler {
  @Inject()
  eventBus: IEventBus;
  orderRepository: IOrderRepository;

  async handle<C extends CommandBase>(command: C): Promise<void> {
    console.log('订单处理');
    this.eventBus.publish(new OrderCreatedEvent(command));
    // throw new Error('Method not implemented.');
  }
}
