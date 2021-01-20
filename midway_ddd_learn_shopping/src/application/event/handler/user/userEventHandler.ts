import { UserCreatedEvent } from '../../../../domain/user/event/userCreatedEvent';
import { IEventHandler } from '../../../../infrastructure/core/event';

export class UserEventHandler implements IEventHandler<UserCreatedEvent> {
  handleEvent(eventData: UserCreatedEvent): void {
    console.log(`用户注册成功:${eventData.userName}`);
  }
}
