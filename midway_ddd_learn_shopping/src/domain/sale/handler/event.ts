import { Provide, Scope, ScopeEnum } from '@midwayjs/decorator';
import {
  DomainEvent,
  EventHandler,
} from '../../../infrastructure/core/ddd/event';
import { OrderCreatedEvent } from '../event/orderCreatedEvent';

@Provide()
@Scope(ScopeEnum.Prototype)
export class OrderCreatedHandler extends EventHandler {
  static evtClazzArray = [OrderCreatedEvent];
  async handleEvent<E extends DomainEvent>(eventData: E): Promise<void> {
    console.log('触发订单创建事件处理器:', eventData);
  }
}
