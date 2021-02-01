import { Provide, Scope, ScopeEnum } from '@midwayjs/decorator';
import { UUID } from '../../util/uuid';
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
export interface IEventHandler {
  // evtClazzArray: Array<new () => DomainEvent>;
  handleEvent<E extends DomainEvent>(eventData: E): void;
}

/**
 * 领域事件处理者接口(订阅者)基类 一般给各个领域事件基层使用
 */
export abstract class EventHandler implements IEventHandler {
  // static evtClazzArray: (new () => DomainEvent)[];
  abstract handleEvent<E extends DomainEvent>(eventData: E): Promise<void>;
}

/**
 * 事件总线接口,用于处理订阅缓存和发布处理 一般用于类型来使用
 */
export interface IEventBus {
  // handlerMap: Map<new () => DomainEvent, Array<new () => EventHandler>>;
  // register<E extends DomainEvent, H extends EventHandler>(
  //   evtClazz: new () => E,
  //   evtHandler: new () => H
  // ): void;
  publish(evt: IDomainEvent): Promise<void>;
  // eventHandlers: Map<UUID, Array<IEventHandler>>>;
  // subscribe(evt: IDomainEvent, evtHandler: IEventHandler<IDomainEvent>): void;
  // publish(evt: IDomainEvent): void;
}

/**
 * 事件总线,用于处理订阅缓存和发布处理 整个进程只有一个实例
 */
@Provide()
@Scope(ScopeEnum.Singleton) //作用域设置全局唯一
export class EventBus implements IEventBus {
  static handlerMap: Map<
    new () => DomainEvent,
    (new () => EventHandler)[]
  > = new Map<new () => DomainEvent, (new () => EventHandler)[]>();

  static register<E extends DomainEvent, H extends EventHandler>(
    evtClazz: new () => E,
    evtHandler: new () => H
  ): void {
    if (!this.handlerMap.has(evtClazz)) {
      this.handlerMap.set(evtClazz, new Array<new () => EventHandler>());
    }

    this.handlerMap.get(evtClazz).push(evtHandler);
  }

  async publish(evt: IDomainEvent): Promise<void> {
    console.log('事件发布');
    const keys = EventBus.handlerMap.keys();
    let hasHandler = false;
    for (const key of keys) {
      if (evt instanceof key) {
        const eventHandlers = EventBus.handlerMap.get(key);
        hasHandler = true;
        await this.execHandle(evt, eventHandlers);
      }
      break;
    }
    if (hasHandler === false) {
      console.log('找不到事件处理者');
    }
  }

  private async execHandle(
    evt: IDomainEvent,
    eventHandlers: Array<new () => EventHandler>
  ): Promise<void> {
    for (const handlerClazz of eventHandlers) {
      const handler = new handlerClazz();
      await handler.handleEvent(evt);
    }
  }

  // //key值为类名 array存放对应的事件实例
  // eventHandlers: Map<UUID, Array<IEventHandler<IDomainEvent>>>;
  // constructor() {
  //   this.eventHandlers instanceof Array;
  //   this.eventHandlers = new Map<UUID, Array<IEventHandler<IDomainEvent>>>();
  // }
  // subscribe(evt: IDomainEvent, evtHandler: IEventHandler<IDomainEvent>): void {
  //   const key = evt.uuid;
  //   if (this.eventHandlers.has(key)) {
  //     this.eventHandlers.get(key).push(evtHandler);
  //   } else {
  //     this.eventHandlers.set(
  //       key,
  //       new Array<IEventHandler<IDomainEvent>>(evtHandler)
  //     );
  //   }
  // }
  // /**
  //  * 发布事件
  //  * @param evt
  //  */
  // publish(evt: IDomainEvent): void {
  //   const key = evt.uuid;
  //   if (this.eventHandlers.has(key)) {
  //     for (const handler of this.eventHandlers.get(key)) {
  //       handler.handleEvent(evt);
  //     }
  //     this.eventHandlers.delete(key);
  //   } else {
  //     console.log(`事件${key}无处理者`);
  //   }
  // }
}
