import { Provide, Scope, ScopeEnum } from '@midwayjs/decorator';
import { UserCreatedEvent } from '../../../../../domain/user/event/userCreatedEvent';
import {
  DomainEvent,
  EventHandler,
} from '../../../../../infrastructure/core/ddd/event';
@Provide()
@Scope(ScopeEnum.Prototype)
export class UserEventHandler extends EventHandler {
  static evtClazzArray = [UserCreatedEvent];
  async handleEvent<E extends DomainEvent>(eventData: E): Promise<void> {
    if (eventData instanceof UserCreatedEvent) {
      console.log(`用户注册成功:${eventData.userName}`);
    } else {
      console.log(`事件订阅了，但是没有进行任何处理:${eventData}`);
    }
  }
}
