import { Inject, Provide } from '@midwayjs/decorator';
import { User } from '../../../domain/user/aggregate/user';
import { IUserRepository } from '../../../domain/user/repository/user';
import { AppService } from '../../../infrastructure/domainCore/appService';
import { UserDTO } from '../../dto/user';

@Provide()
export class UserAppService extends AppService {
  @Inject()
  userRepository: IUserRepository;

  constructor() {
    super();
  }

  /**
   * 添加用户
   * @param user
   */
  addUser(user: UserDTO): void {
    const _user = new User(null, user.userName, user.passWord);
    this.userRepository.save(_user);
  }

  /**
   * 登陆
   * @param user
   */
  login(user: UserDTO): void {
    const _user = this.userRepository.get(user.userName);
    if (!_user) {
      throw new Error('账号不存在!');
    }
    if (!_user.equalPassword(user.passWord)) {
      throw new Error('密码错误!');
    }
  }
}
