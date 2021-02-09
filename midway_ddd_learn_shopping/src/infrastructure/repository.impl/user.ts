import { Init, Inject, Provide } from '@midwayjs/decorator';
import { User } from '../../domain/user/model/user/user';
import { IUserRepository } from '../../domain/user/repository/user';
import { MongoDbContext } from '../db/mongodb/db-context';
import { Converter } from '../common/util/converter';

@Provide()
export class UserRepository implements IUserRepository {
  @Inject('mongoDbContext')
  dbCtx: MongoDbContext;

  @Init()
  async initMethod(): Promise<void> {
    //切换数据库
    this.dbCtx.switchDatabase('admin');
  }

  async getById(id: string): Promise<User> {
    const result = await this.dbCtx.get('user', { userId: id });
    if (result) {
      return Converter.pojoConvertEntity(result, User);
    } else {
      return null;
    }
  }
  async save(user: User): Promise<boolean> {
    const isExist = await this.dbCtx.get('user', { userId: user.getUserId() });
    if (isExist) {
      await this.dbCtx.update('user', { userId: user.getUserId() }, user);
    } else {
      await this.dbCtx.save('user', user);
    }
    return true;
  }

  async remove(id: string): Promise<boolean> {
    await this.dbCtx.remove('user', { userId: id });
    return true;
  }

  async get(userName: string): Promise<User> {
    const result = await this.dbCtx.get('user', { userName: userName });
    if (result) {
      console.log(result);
      return Converter.pojoConvertEntity(result, User);
    } else {
      return null;
    }
  }
}
