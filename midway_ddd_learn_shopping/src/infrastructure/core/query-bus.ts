import { App, Init, Provide, Scope, ScopeEnum } from '@midwayjs/decorator';
import { Application } from 'egg';
import { QueryBase, QueryExecutorBase } from './application/query';
export interface IQueryBus {
  executorMap: Map<new () => QueryBase, (new () => QueryExecutorBase)[]>;
  /**
   * 订阅查询
   */
  subscribe<C extends QueryBase, H extends QueryExecutorBase>(
    cmdClazz: new () => C,
    executorClazz: new () => H
  ): void;
  /**
   * 执行查询
   * @param query
   */
  send<C extends QueryBase>(query: C): Promise<void>;
}

/**
 * 查询总线
 * 职责:
 * 1)负责管理查询执行者订阅查询
 * 2)转发查询,交给查询执行者们处理
 */
@Provide()
@Scope(ScopeEnum.Singleton)
export class QueryBus implements IQueryBus {
  @App()
  app: Application;

  @Init()
  init(): void {
    console.log('this.app:', this.app);
  }

  //收集归纳查询执行者
  executorMap: Map<
    new () => QueryBase,
    (new () => QueryExecutorBase)[]
  > = new Map<new () => QueryBase, (new () => QueryExecutorBase)[]>();

  //订阅查询
  subscribe<C extends QueryBase, H extends QueryExecutorBase>(
    cmdClazz: new () => C,
    executorClazz: new () => H
  ): void {
    if (!this.executorMap.has(cmdClazz)) {
      this.executorMap.set(cmdClazz, new Array<new () => QueryExecutorBase>());
    }

    this.executorMap.get(cmdClazz).push(executorClazz);
  }
  async send<C extends QueryBase>(query: C): Promise<any> {
    const keys = this.executorMap.keys();
    let hasExecutor = false;
    for (const key of keys) {
      if (query instanceof key) {
        const executorClazzArray = this.executorMap.get(key);
        hasExecutor = true;
        return await this.sendQuery(query, executorClazzArray);
      }
    }
    if (hasExecutor === false) {
      throw new Error('找不到该查询的执行者');
    }

    // throw new Error('Method not implemented.');
  }

  private async sendQuery<C extends QueryBase, H extends QueryExecutorBase>(
    query: C,
    executorClazzArray: Array<new () => H>
  ) {
    const taskArray = [];
    for (const executorClazz of executorClazzArray) {
      const executor = await this.app.applicationContext.getAsync(
        executorClazz
      );
      taskArray.push(executor.executeQuery(query));
      console.log('找到查询执行者了', executor);
      // await executor.executeQuery(query);
    }
    return await Promise.all(taskArray);
  }
}
