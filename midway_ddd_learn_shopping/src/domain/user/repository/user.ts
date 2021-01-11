import { UUID } from '../../../infrastructure/util/uuid';
import { User } from '../aggregate/user';

export interface IUserRepository {
  getById(id: UUID): User;
  save(user: User): void;
  remove(id: UUID): void;
  get(userName: string): User;
}
