import { UUID } from '../../common/util/uuid';

export interface ICommandBase {
  uuid: string;
  createTime: Date;
}

export interface ICommandExecutorBase {
  uuid: string;
  createTime: Date;
  executeCommand<C extends CommandBase>(command: C): Promise<void>;
}

// 命令基类
export abstract class CommandBase implements ICommandBase {
  uuid: string;
  createTime: Date;
  constructor(uuid?: string, createTime?: Date) {
    this.uuid = uuid || UUID.randomUUID();
    this.createTime = createTime || new Date();
  }
}

/**
 * 命令处理类
 */
export abstract class CommandExecutorBase implements ICommandExecutorBase {
  uuid: string;
  createTime: Date;
  constructor(uuid?: string, createTime?: Date) {
    this.uuid = uuid || UUID.randomUUID();
    this.createTime = createTime || new Date();
  }

  abstract executeCommand<C extends CommandBase>(command: C): Promise<void>;
}
