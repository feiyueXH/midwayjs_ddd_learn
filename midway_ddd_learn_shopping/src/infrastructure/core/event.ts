import { Provide, Scope, ScopeEnum } from '@midwayjs/decorator';
import { UUID } from '../util/uuid';
import { IEntity } from './entity';

/**
 * 领域事件接口 一般用于类型来使用
 */
export interface IDomainEvent {
  source: IEntity;
  uuid: string;
  createTime: Date;

  getCreateTime(): Date;
  setCreateTime(date: Date): void;

  toString(): string;
}

/**
 * 领域事件基类 一般给各个领域事件基层使用
 */
export class DomainEvent implements IDomainEvent {
  uuid: string;
  createTime: Date;
  source: IEntity;

  constructor(source: IEntity) {
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
 * 领域事件处理者接口(订阅者) 一般用于类型来使用
 */
export interface IEventHandler<TEventData extends DomainEvent> {
  handleEvent(eventData: TEventData): void;
}

/**
 * 领域事件处理者接口(订阅者)基类 一般给各个领域事件基层使用
 */
export class EventHandler implements IEventHandler<DomainEvent> {
  handleEvent(eventData: DomainEvent): void {}
}

/**
 * 事件总线接口,用于处理订阅缓存和发布处理 一般用于类型来使用
 */
export interface IEventBus {
  eventHandlers: Map<UUID, Array<IEventHandler<IDomainEvent>>>;
  subscribe(evt: IDomainEvent, evtHandler: IEventHandler<IDomainEvent>): void;
  publish(evt: IDomainEvent): void;
}

/**
 * 事件总线,用于处理订阅缓存和发布处理 整个进程只有一个实例
 */
@Provide()
@Scope(ScopeEnum.Singleton) //作用域设置全局唯一
export class EventBus implements IEventBus {
  //key值为类名 array存放对应的事件实例
  eventHandlers: Map<UUID, Array<IEventHandler<IDomainEvent>>>;

  constructor() {
    this.eventHandlers instanceof Array;
    this.eventHandlers = new Map<UUID, Array<IEventHandler<IDomainEvent>>>();
  }
  subscribe(evt: IDomainEvent, evtHandler: IEventHandler<IDomainEvent>): void {
    const key = evt.uuid;
    if (this.eventHandlers.has(key)) {
      this.eventHandlers.get(key).push(evtHandler);
    } else {
      this.eventHandlers.set(
        key,
        new Array<IEventHandler<IDomainEvent>>(evtHandler)
      );
    }
  }

  /**
   * 发布事件
   * @param evt
   */
  publish(evt: IDomainEvent): void {
    const key = evt.uuid;
    if (this.eventHandlers.has(key)) {
      for (const handler of this.eventHandlers.get(key)) {
        handler.handleEvent(evt);
      }
      this.eventHandlers.delete(key);
    } else {
      console.log(`事件${key}无处理者`);
    }
  }
}
