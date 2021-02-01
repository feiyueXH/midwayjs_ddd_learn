import { User } from '../model/user/user';

export interface IUserRepository {
  getById(id: string): Promise<User>;
  save(user: User): Promise<boolean>;
  remove(id: string): Promise<boolean>;
  get(userName: string): Promise<User>;
}
