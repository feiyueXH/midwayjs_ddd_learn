import { DomainService } from '../infrastructure/domainCore/domainService';
import { User } from './entity/user';
import { IUserRepository } from './repository/user';

export class UserDomainService extends DomainService {
  private _userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    super();
    this._userRepository = userRepository;
  }

  // public UserDomainService(userRepository: IUserRepository): void {
  //   this._userRepository = userRepository;
  // }

  /**
   * 注册用户
   * @param user
   */
  public Register(user: User): void {
    if (this._userRepository.IsExistId(user.id)) {
      throw new Error('用户名已存在');
    }
    this._userRepository.Add(user);
  }
}
