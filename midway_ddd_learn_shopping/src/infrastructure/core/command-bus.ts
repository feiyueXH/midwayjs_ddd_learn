import { App, Init, Provide, Scope, ScopeEnum } from '@midwayjs/decorator';
import { Application } from 'egg';
import { CommandBase, CommandExecutorBase } from './application/command';
export interface ICommandBus {
  executorMap: Map<new () => CommandBase, (new () => CommandExecutorBase)[]>;
  /**
   * 订阅命令
   */
  subscribe<C extends CommandBase, H extends CommandExecutorBase>(
    cmdClazz: new () => C,
    executorClazz: new () => H
  ): void;
  /**
   * 执行命令
   * @param command
   */
  send<C extends CommandBase>(command: C): Promise<void>;
}

/**
 * 命令总线
 * 职责:
 * 1)负责管理命令执行者订阅命令
 * 2)发送命令给命令执行者执行
 */
@Provide()
@Scope(ScopeEnum.Singleton)
export class CommandBus implements ICommandBus {
  @App()
  app: Application;

  @Init()
  init(): void {
    console.log('this.app:', this.app);
  }

  //收集归纳命令执行者
  executorMap: Map<
    new () => CommandBase,
    (new () => CommandExecutorBase)[]
  > = new Map<new () => CommandBase, (new () => CommandExecutorBase)[]>();

  //订阅命令
  subscribe<C extends CommandBase, H extends CommandExecutorBase>(
    cmdClazz: new () => C,
    executorClazz: new () => H
  ): void {
    if (!this.executorMap.has(cmdClazz)) {
      this.executorMap.set(
        cmdClazz,
        new Array<new () => CommandExecutorBase>()
      );
    }

    this.executorMap.get(cmdClazz).push(executorClazz);
  }
  async send<C extends CommandBase>(command: C): Promise<void> {
    const keys = this.executorMap.keys();
    let hasExecutor = false;
    for (const key of keys) {
      if (command instanceof key) {
        const executorClazzArray = this.executorMap.get(key);
        hasExecutor = true;
        await this.sendCommand(command, executorClazzArray);
        break;
      }
    }
    if (hasExecutor === false) {
      throw new Error('找不到该命令的执行者');
    }

    // throw new Error('Method not implemented.');
  }

  private async sendCommand<
    C extends CommandBase,
    H extends CommandExecutorBase
  >(command: C, executorClazzArray: Array<new () => H>) {
    const taskArray = [];
    for (const executorClazz of executorClazzArray) {
      const executor = await this.app.applicationContext.getAsync(
        executorClazz
      );
      taskArray.push(executor.executeCommand(command));
      console.log('找到命令执行者了', executor);
      // await executor.executeCommand(command);
    }

    // taskArray.push(
    //   new Promise((resolve, reject) => {
    //     throw new Error('故意抛出的异常');
    //   })
    // );
    await Promise.all(taskArray);
  }
}
