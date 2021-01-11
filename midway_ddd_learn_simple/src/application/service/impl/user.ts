import { Inject, Provide } from '@midwayjs/decorator';
import { IUserLoginService } from '../../../domain/user/service/userLoginService';
import { IUserRegisterService } from '../../../domain/user/service/userRegisterService';
import { AppService } from '../../../infrastructure/domainCore/appService';
import { UserDTO } from '../../dto/user';
import { IUserAppService } from '../user';

@Provide()
export class UserAppService extends AppService implements IUserAppService {
  @Inject('userLoginService')
  userLoginService: IUserLoginService;

  @Inject('userRegisterService')
  userRegisterService: IUserRegisterService;

  constructor() {
    super();
  }

  /**
   * 用户注册
   * @param user
   */
  async register(user: UserDTO): Promise<void> {
    await this.userRegisterService.register(user);
  }

  /**
   * 登陆
   * @param user
   */
  async login(user: UserDTO): Promise<void> {
    await this.userLoginService.login(user);
  }
}
