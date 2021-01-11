import { UserDTO } from '../../../application/dto/user';

export interface IUserRegisterService {
  /**
   * 登陆
   * @param user
   */
  register(user: UserDTO): Promise<void>;
}
