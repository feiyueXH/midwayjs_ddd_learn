import { Provide, Scope, ScopeEnum } from '@midwayjs/decorator';
import { UUID } from '../../util/uuid';

// 命令基类
export abstract class CommandBase {
  id: string;
  constructor(id?: string) {
    this.id = id || UUID.randomUUID();
  }
}

export abstract class CommandHandlerBase {
  id: string;
  constructor(id?: string) {
    this.id = id || UUID.randomUUID();
  }

  abstract handle<C extends CommandBase>(command: C): Promise<void>;
}

export interface ICommandBus {
  handlerMap: Map<new () => CommandBase, (new () => CommandHandlerBase)[]>;
  /**
   * 订阅命令
   */
  subscribe<C extends CommandBase, H extends CommandHandlerBase>(
    cmdClazz: new () => C,
    handlerClazz: new () => H
  ): void;
  /**
   * 执行命令
   * @param command
   */
  execution<C extends CommandBase>(command: C): Promise<void>;
}

/**
 * 命令总线
 * 职责:
 * 1)负责管理命令处理者器订阅命令
 * 2)转发命令,交给命令处理器们处理
 */
@Provide()
@Scope(ScopeEnum.Singleton)
export class CommandBus implements ICommandBus {
  //收集归纳命令处理器
  handlerMap: Map<
    new () => CommandBase,
    (new () => CommandHandlerBase)[]
  > = new Map<new () => CommandBase, (new () => CommandHandlerBase)[]>();

  //订阅命令
  subscribe<C extends CommandBase, H extends CommandHandlerBase>(
    cmdClazz: new () => C,
    handlerClazz: new () => H
  ): void {
    if (!this.handlerMap.has(cmdClazz)) {
      this.handlerMap.set(cmdClazz, new Array<new () => CommandHandlerBase>());
    }

    this.handlerMap.get(cmdClazz).push(handlerClazz);
  }
  async execution<C extends CommandBase>(command: C): Promise<void> {
    const keys = this.handlerMap.keys();
    let hasHandler = false;
    for (const key of keys) {
      if (command instanceof key) {
        const handlerClazzArray = this.handlerMap.get(key);
        hasHandler = true;
        await this.execHandle(command, handlerClazzArray);
      }
      break;
    }
    if (hasHandler === false) {
      throw new Error('找不到该命令的处理者');
    }

    // throw new Error('Method not implemented.');
  }

  private async execHandle<C extends CommandBase, H extends CommandHandlerBase>(
    command: C,
    handlerClazzArray: Array<new () => H>
  ) {
    for (const handlerClazz of handlerClazzArray) {
      const handler = new handlerClazz();
      await handler.handle(command);
    }
  }
}
