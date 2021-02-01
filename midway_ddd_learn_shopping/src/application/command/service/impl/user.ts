import { Inject, Provide } from '@midwayjs/decorator';
import { UserCreatedEvent } from '../../../../domain/user/event/userCreatedEvent';
import { IUserLoginService } from '../../../../domain/user/service/userLoginService';
import { IUserRegisterService } from '../../../../domain/user/service/userRegisterService';
import { AppService } from '../../../../infrastructure/core/ddd/appService';
import { IEventBus } from '../../../../infrastructure/core/ddd/event';

import { UserDTO } from '../../../../infrastructure/dto/user';
// import { UserEventHandler } from '../../event/handler/user/userEventHandler';
import { IUserCommandService } from '../user';

@Provide()
export class UserCommandService
  extends AppService
  implements IUserCommandService {
  @Inject('userLoginService')
  userLoginService: IUserLoginService;

  @Inject('userRegisterService')
  userRegisterService: IUserRegisterService;

  @Inject()
  eventBus: IEventBus;

  constructor() {
    super();
  }

  /**
   * 用户注册
   * @param user
   */
  async register(user: UserDTO): Promise<void> {
    const event = new UserCreatedEvent(user.userName);
    //订阅事件
    // this.eventBus.subscribe(event, new UserEventHandler());
    await this.userRegisterService.register(user);
    //发布事件
    this.eventBus.publish(event);
  }

  /**
   * 登陆
   * @param user
   */
  async login(user: UserDTO): Promise<void> {
    await this.userLoginService.login(user);
  }
}
