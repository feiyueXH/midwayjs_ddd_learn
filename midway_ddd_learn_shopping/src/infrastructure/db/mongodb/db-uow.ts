import { Init, Inject, Provide, Scope, ScopeEnum } from '@midwayjs/decorator';
import { ClientSession, Connection } from 'mongoose';
import { IOptions, IUnitOfWork } from '../../core/base/uow';
import { UUID } from '../../common/util/uuid';
import { MongoDbManager } from './db-manager';

export interface IMongoUnitOfWork extends IUnitOfWork {
  openTransaction: boolean;
  /**
   * 这里是工作单元的唯一标志，暂时先定义并赋值，后面可能会有用到。目前打算先做成请求上下文共用一个单元，但后面如果将一个请求拆分成多个Command，甚至更细的粒度，就可能需要这个唯一标志来做识别。
   */
  id: string;
  /**
   * mongodb使用事务只需要在执行函数的options注入开启事务的session
   * @param options //mongodb执行语句的执行参数
   */
  register(options: IOptions): IOptions;
}

@Scope(ScopeEnum.Request)
@Provide('mongoUnitOfWork')
export class MongoUnitOfWork implements IMongoUnitOfWork {
  id: string;

  private session: ClientSession;

  private _openTransaction: boolean;
  public get openTransaction(): boolean {
    return this._openTransaction;
  }

  @Inject()
  mongoDbManager: MongoDbManager;

  constructor() {
    this.id = UUID.randomUUID();
  }

  @Init()
  async initMethod(): Promise<void> {
    const db: Connection = this.mongoDbManager.getDB('admin');
    if (!db) {
      throw new Error('获取数据库连接对象失败');
    }
    this.session = await db.startSession();
  }

  private startTransaction(): void {
    if (!this.session) {
      throw new Error('工作单元初始化时创建事务会话失败!');
    } else {
      this.session.startTransaction();
      this._openTransaction = true;
    }
  }

  register(options: IOptions): IOptions {
    if (!this.session) {
      return options;
    }
    if (!this.openTransaction) {
      this.startTransaction();
      console.log('事务已开启!');
    }
    const session = this.session;
    options = { session, ...options };
    // console.log('register:', options);
    return options;
  }

  async commit(): Promise<void> {
    if (this._openTransaction) {
      await this.session.commitTransaction();
      this.session.endSession();
      this._openTransaction = false;
      console.log('事务已提交!');
    }
  }
  async abort(): Promise<void> {
    if (this._openTransaction) {
      await this.session.abortTransaction();
      this.session.endSession();
      this._openTransaction = false;
      console.log('事务已回滚!');
    }
  }
}
