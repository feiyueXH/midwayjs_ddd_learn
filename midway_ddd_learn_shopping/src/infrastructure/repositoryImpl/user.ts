import { Inject, Provide } from '@midwayjs/decorator';
import { User } from '../../domain/user/aggregate/user';
import { IUserRepository } from '../../domain/user/repository/user';
import { IBaseDao } from '../db/mongodb/dao/baseDao';
import { DaoFactory } from '../db/mongodb/daoFactory';
import { Converter } from '../util/converter';

@Provide()
export class UserRepository implements IUserRepository {
  @Inject()
  daoFactory: DaoFactory;

  userDao: IBaseDao;

  constructor(@Inject() daoFactory: DaoFactory) {
    //从dao工厂获取Dao
    this.userDao = daoFactory.getDao('admin', { modelName: 'user' });
  }

  async getById(id: string): Promise<User> {
    const result = await this.userDao.get({ userId: id });
    if (result) {
      return Converter.pojoConvertEntity(result, User);
    } else {
      return null;
    }
  }
  async save(user: User): Promise<boolean> {
    await this.userDao.create(user);
    return true;
  }
  async remove(id: string): Promise<boolean> {
    await this.userDao.remove({ userId: id });
    return true;
  }

  async get(userName: string): Promise<User> {
    const result = await this.userDao.get({ userName: userName });
    if (result) {
      console.log(result);
      return Converter.pojoConvertEntity(result, User);
    } else {
      return null;
    }
  }
}
