import { UserDTO } from '../../../infrastructure/dto/user';

export interface IUserLoginService {
  /**
   * 登陆
   * @param user
   */
  login(user: UserDTO): Promise<void>;
}
