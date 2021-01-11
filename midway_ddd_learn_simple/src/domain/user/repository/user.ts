import { UUID } from '../../../infrastructure/util/uuid';
import { User } from '../aggregate/user';

export interface IUserRepository {
  getById(id: UUID): Promise<User>;
  save(user: User): Promise<void>;
  remove(id: UUID): Promise<void>;
  get(userName: string): Promise<User>;
}
