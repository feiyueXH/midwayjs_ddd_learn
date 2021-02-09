import { UUID } from '../../common/util/uuid';

export interface IEventBase {
  source: any;
  uuid: string;
  createTime: Date;

  getCreateTime(): Date;
  setCreateTime(date: Date): void;

  toString(): string;
}
/**
 * 领域事件基类 一般给各个领域事件基层使用
 */
export class EventBase implements IEventBase {
  uuid: string;
  createTime: Date;
  source: any;

  constructor(source?: any) {
    this.source = source;
    this.uuid = UUID.randomUUID();
    this.setCreateTime(new Date());
  }

  getCreateTime(): Date {
    return this.createTime;
  }
  setCreateTime(date: Date): void {
    this.createTime = date;
  }

  toString(): string {
    throw new Error('Method not implemented.');
  }
}

/**
 * 事件处理者接口(订阅者) 一般用于类型来使用
 */
export interface IEventHandlerBase {
  handleEvent<E extends EventBase>(eventData: E): void;
}

/**
 * 事件处理者接口(订阅者)基类 一般给各个事件基层使用
 */
export abstract class EventHandlerBase implements IEventHandlerBase {
  abstract handleEvent<E extends EventBase>(eventData: E): Promise<void>;
}
