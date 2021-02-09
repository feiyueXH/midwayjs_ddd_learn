import { App, Provide, Scope, ScopeEnum } from '@midwayjs/decorator';
import { Application } from 'egg';
import { EventBase, EventHandlerBase, IEventBase } from './base/event';

/**
 * 事件总线接口,用于处理订阅缓存和发布处理 一般用于类型来使用
 */
export interface IEventBus {
  handlerMap: Map<new () => EventBase, (new () => EventHandlerBase)[]>;
  subscribe<E extends EventBase, H extends EventHandlerBase>(
    evtClazz: new () => E,
    evtHandler: new () => H
  ): void;
  publish(evt: IEventBase): Promise<void>;
}

/**
 * 事件总线,用于处理订阅缓存和发布处理 整个进程只有一个实例
 */
@Provide()
@Scope(ScopeEnum.Singleton) //作用域设置全局唯一
export class EventBus implements IEventBus {
  @App()
  app: Application;

  handlerMap: Map<
    new () => EventBase,
    (new () => EventHandlerBase)[]
  > = new Map<new () => EventBase, (new () => EventHandlerBase)[]>();

  public subscribe<E extends EventBase, H extends EventHandlerBase>(
    evtClazz: new () => E,
    evtHandler: new () => H
  ): void {
    if (!this.handlerMap.has(evtClazz)) {
      this.handlerMap.set(evtClazz, new Array<new () => EventHandlerBase>());
    }

    this.handlerMap.get(evtClazz).push(evtHandler);
  }

  public async publish(evt: IEventBase): Promise<void> {
    console.log('事件发布:', evt);
    const keys = this.handlerMap.keys();
    let hasHandler = false;
    for (const key of keys) {
      console.log('evt instanceof key:', evt instanceof key);
      if (evt instanceof key) {
        const eventHandlers = this.handlerMap.get(key);
        hasHandler = true;
        await this.execHandle(evt, eventHandlers);
        break;
      }
    }
    if (hasHandler === false) {
      console.log('找不到事件处理者');
    }
  }

  private async execHandle(
    evt: IEventBase,
    eventHandlers: Array<new () => EventHandlerBase>
  ): Promise<void> {
    for (const handlerClazz of eventHandlers) {
      const handler = await this.app.applicationContext.getAsync(handlerClazz);
      console.log('找到事件处理者了', handler);
      await handler.handleEvent(evt);
    }
  }
}
