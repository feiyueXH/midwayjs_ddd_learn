import { UserDTO } from '../dto/user';

export interface IUserAppService {
  register(user: UserDTO): Promise<void>;
  login(user: UserDTO): Promise<void>;
}
