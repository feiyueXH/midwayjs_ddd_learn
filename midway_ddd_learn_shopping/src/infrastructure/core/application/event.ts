import { UUID } from '../../common/util/uuid';
import { IEventBase } from '../base/event';
import { DomainEvent } from '../domain/event';

/**
 * 应用层的事件基类接口，还没想好怎么用，先定义后面确定应用层事件的定义再使用
 */
export interface IApplicationEvent extends IEventBase {
  source: any;
}

/**
 * 应用层的事件基类，还没想好怎么用，先定义后面确定应用层事件的定义再使用
 */
export class ApplicationEvent implements IApplicationEvent {
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
 * 应用层的事件处理者基类接口，可以处理应用层事件和领域层事件。
 */
export interface IApplicationEventHandler {
  handleEvent<E extends ApplicationEvent | DomainEvent>(eventData: E): void;
}

/**
 * 应用层的事件处理者基类，可以处理应用层事件和领域层事件。
 */
export abstract class ApplicationEventHandler
  implements IApplicationEventHandler {
  abstract handleEvent<E extends ApplicationEvent | DomainEvent>(
    eventData: E
  ): Promise<void>;
}
