import { Config, Configuration, Inject } from '@midwayjs/decorator';
import { ILifeCycle, IMidwayContainer } from '@midwayjs/core';
import { MDB } from './infrastructure/db/mongodb/mongo';
import { DaoFactory } from './infrastructure/db/mongodb/daoFactory';

@Configuration()
export class ContainerConfiguration implements ILifeCycle {
  @Inject('MDB')
  MDB: MDB;

  @Config('mongoose')
  config: any;

  @Inject()
  daoFactory: DaoFactory;

  async onReady(container: IMidwayContainer): Promise<void> {
    // 建立数据库连接
    const mongoClient = this.MDB.pushDB(this.config);
    // 为数据库链接对象创建Model
    this.daoFactory.constructModel(this.config.key, mongoClient);
  }

  async onStop(): Promise<void> {
    // 关闭数据库连接
    this.MDB.removeAll();
  }
}
