import { Inject, Provide } from '@midwayjs/decorator';
import { User } from '../../domain/user/aggregate/user';
import { IUserRepository } from '../../domain/user/repository/user';
import { BaseDao } from '../db/mongodb/dao/baseDao';
import { DaoFactory } from '../db/mongodb/daoFactory';
import { UUID } from '../util/uuid';

@Provide()
export class UserRepository implements IUserRepository {
  @Inject()
  daoFactory: DaoFactory;

  userDao: BaseDao;

  constructor(@Inject() daoFactory: DaoFactory) {
    //从dao工厂获取Dao
    this.userDao = daoFactory.getDao('admin', { modelName: 'user' });
  }

  async getById(id: UUID): Promise<User> {
    const result = await this.userDao.get({ userId: id });
    if (result) {
      return new User(result.userId, result.userName, result.passWord);
    } else {
      return null;
    }
  }
  async save(user: User): Promise<void> {
    await this.userDao.create(user);
  }
  async remove(id: UUID): Promise<void> {
    await this.userDao.remove({ userId: id });
  }

  async get(userName: string): Promise<User> {
    const result = await this.userDao.get({ userName: userName });
    if (result) {
      return new User(result.userId, result.userName, result.passWord);
    } else {
      return null;
    }
  }
}
