import { UserDTO } from '../../../infrastructure/dto/user';

export interface IUserCommandService {
  register(user: UserDTO): Promise<void>;
  login(user: UserDTO): Promise<void>;
}
