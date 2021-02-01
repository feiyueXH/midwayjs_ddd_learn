import {
  Scope,
  ScopeEnum,
  saveClassMetadata,
  saveModule,
} from '@midwayjs/decorator';
import { CommandBase } from '../core/cqrs/command';

const MODULE_KEY = 'decorator:subscribeCommand';

export function SubscribeCommand<C extends CommandBase>(
  cmdClazz: new () => C | (new () => C)[]
): ClassDecorator {
  return (target: any) => {
    console.log('SubscribeCommand:', cmdClazz);

    // 将装饰的类，绑定到该装饰器，用于后续能获取到 class
    saveModule(MODULE_KEY, target);
    // 保存一些元数据信息，任意你希望存的东西
    saveClassMetadata(
      MODULE_KEY,
      {
        cmdArray: cmdClazz instanceof Array ? cmdClazz : [cmdClazz],
      },
      target
    );
    // 指定 IoC 容器创建实例的作用域，这里注册为请求作用域，这样能取到 ctx
    Scope(ScopeEnum.Request)(target);
  };
}
