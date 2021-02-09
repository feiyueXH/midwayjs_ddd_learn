import { Inject, Provide } from '@midwayjs/decorator';
import { OrderCreatedEvent } from '../../../../domain/sale/event/order-created.event';
import { IOrderRepository } from '../../../../domain/sale/repository/order';
import {
  CommandBase,
  CommandExecutorBase,
} from '../../../../infrastructure/core/application/command';
import { IEventBus } from '../../../../infrastructure/core/event-bus';
import { SubscribeCommand } from '../../../../infrastructure/decorator/command';
import { CreateOrderCommand } from '../../../command/sale/impl/create-order.command';
import { ICreateOrderExecutor } from '../interface';

@SubscribeCommand(CreateOrderCommand)
@Provide()
export class CreateOrderExecutor
  extends CommandExecutorBase
  implements ICreateOrderExecutor {
  @Inject()
  eventBus: IEventBus;
  orderRepository: IOrderRepository;

  async executeCommand<C extends CommandBase>(command: C): Promise<void> {
    if (command instanceof CreateOrderCommand) {
      console.log('触发订单创建命令处理者:', command);
      this.eventBus.publish(new OrderCreatedEvent(command));
    } else {
      throw new Error('未定义的命令');
    }
  }
}
