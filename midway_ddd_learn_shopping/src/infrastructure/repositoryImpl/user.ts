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

  getById(id: UUID): User {
    throw new Error('Method not implemented.');
  }
  save(user: User): void {
    this.userDao.create(user);
  }
  remove(id: UUID): void {
    throw new Error('Method not implemented.');
  }
  get(userName: string): User {
    throw new Error('Method not implemented.');
  }
}
