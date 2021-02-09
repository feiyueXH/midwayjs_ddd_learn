import { Provide, Scope, ScopeEnum } from '@midwayjs/decorator';
import { UserCreatedEvent } from '../../../domain/user/event/user-created.event';
import { ApplicationEventHandler } from '../../../infrastructure/core/application/event';
import { DomainEvent } from '../../../infrastructure/core/domain/event';
import { SubscribeEvent } from '../../../infrastructure/decorator/event';

@Provide()
@Scope(ScopeEnum.Prototype)
@SubscribeEvent(UserCreatedEvent)
export class UserEventHandler extends ApplicationEventHandler {
  static evtClazzArray = [UserCreatedEvent];
  async handleEvent<E extends DomainEvent>(eventData: E): Promise<void> {
    if (eventData instanceof UserCreatedEvent) {
      console.log(`用户注册成功:${eventData.userName}`);
    } else {
      console.log(`事件订阅了，但是没有进行任何处理:${eventData}`);
    }
  }
}
