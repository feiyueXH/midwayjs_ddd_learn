import { App, Config, Configuration, Inject } from '@midwayjs/decorator';
// eslint-disable-next-line node/no-extraneous-import
import { ILifeCycle } from '@midwayjs/core';
import { MongoDbManager } from './infrastructure/db/mongodb/dbManager';
import { Application } from 'egg';
import { MongoDbContext } from './infrastructure/db/mongodb/dbContext';
import { getProps } from './infrastructure/util/converter';
import { EventBus, EventHandler } from './infrastructure/core/ddd/event';
// import { DbContextProxy } from './infrastructure/db/mongodb/aspect/dbProxy';
// 实现 Model 装饰器功能
import { listModule, getClassMetadata } from '@midwayjs/decorator';
import { ICommandBus } from './infrastructure/core/cqrs/command';
@Configuration()
export class ContainerConfiguration implements ILifeCycle {
  @App()
  app: Application;

  @Inject()
  mongoDbManager: MongoDbManager;

  @Config('mongoose')
  config: any;

  @Inject()
  mongoDbContext: MongoDbContext;

  @Inject()
  commandBus: ICommandBus;

  // @Inject('dbContextProxy')
  // dbContextProxy: DbContextProxy;

  async onReady(): Promise<void> {
    // 建立数据库连接
    const mongoClient = this.mongoDbManager.pushDB(this.config);

    // 为数据库链接对象创建Model
    await MongoDbContext.constructModel(this.config.key, mongoClient);

    //======挂载全局中间件 start======
    this.app.use(await this.app.generateMiddleware('errorHandleMiddleware'));
    this.app.use(await this.app.generateMiddleware('reportMiddleware'));
    //======挂载全局中间件 end======

    // 获取依赖注入容器
    const container = this.app.getApplicationContext();
    // 通过反射获取容器类的静态属性:parentDefinitionMetadata
    const clazzMap: Map<string, Array<any>> = getProps(
      container.constructor,
      'parentDefinitionMetadata'
    );

    //遍历所有被@Provide()注入到容器的Class
    for (const key of clazzMap.keys()) {
      const clazzArray = clazzMap.get(key);
      for (const clazz of clazzArray) {
        if (clazz.path.__proto__ === EventHandler) {
          for (const evtClazz of clazz.path.evtClazzArray) {
            EventBus.register(evtClazz, clazz.path); //自动订阅事件
          }
        }
      }
    }

    const MODULE_KEY = 'decorator:subscribeCommand';
    // 可以获取到所有装饰了 @SubscribeCommand 装饰器的 class
    const modules = listModule(MODULE_KEY);
    for (const mod of modules) {
      const metaData = getClassMetadata(MODULE_KEY, mod);
      if (metaData.cmdArray instanceof Array) {
        for (const cmdClazz of metaData.cmdArray) {
          this.commandBus.subscribe(cmdClazz, mod);
        }
      }
      // 实现自定义能力
      // 从 mod 上拿元数据，做不同的处理
      // 提前初始化等 app.applicationContext.getAsync(getProvideId(mod));
    }
    console.log(this.commandBus.handlerMap);
  }

  async onStop(): Promise<void> {
    // 关闭数据库连接
    this.mongoDbManager.removeAll();
  }
}
