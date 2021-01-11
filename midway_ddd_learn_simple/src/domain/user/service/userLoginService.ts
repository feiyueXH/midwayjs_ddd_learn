import { UserDTO } from '../../../application/dto/user';

export interface IUserLoginService {
  /**
   * 登陆
   * @param user
   */
  login(user: UserDTO): Promise<void>;
}
