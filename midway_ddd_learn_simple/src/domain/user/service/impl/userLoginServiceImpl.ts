import { Inject, Provide } from '@midwayjs/decorator';
import { UserDTO } from '../../../../application/dto/user';
import { DomainService } from '../../../../infrastructure/domainCore/domainService';
import { User } from '../../aggregate/user';
import { IUserRepository } from '../../repository/user';
import { IUserLoginService } from '../userLoginService';

@Provide('userLoginService')
export class UserLoginServiceImpl
  extends DomainService
  implements IUserLoginService {
  @Inject()
  userRepository: IUserRepository;
  /**
   * 登陆
   * @param user
   */
  async login(user: UserDTO): Promise<void> {
    const _user: User = await this.userRepository.get(user.userName);
    if (!_user) {
      throw new Error('账号不存在!');
    }
    if (!_user.equalPassword(user.passWord)) {
      throw new Error('密码错误!');
    }
  }
}
