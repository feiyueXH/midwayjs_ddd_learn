import { Inject, Provide } from '@midwayjs/decorator';
import { UserDTO } from '../../../../application/dto/user';
import { DomainService } from '../../../../infrastructure/domainCore/domainService';
import { User } from '../../aggregate/user';
import { IUserRepository } from '../../repository/user';
import { IUserRegisterService } from '../userRegisterService';

@Provide('userRegisterService')
export class UserRegisterServiceImpl
  extends DomainService
  implements IUserRegisterService {
  @Inject()
  userRepository: IUserRepository;

  async register(user: UserDTO): Promise<void> {
    if ((await this.userRepository.get(user.userName)) !== null) {
      throw new Error('账户已存在!');
    }
    const _user = new User(undefined, user.userName, user.passWord);
    await this.userRepository.save(_user);
  }
}
