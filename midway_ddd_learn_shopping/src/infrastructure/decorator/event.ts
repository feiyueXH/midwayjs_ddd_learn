import {
  Scope,
  ScopeEnum,
  saveClassMetadata,
  saveModule,
} from '@midwayjs/decorator';
import { isClass } from '../core/base/base';
import { DomainEvent } from '../core/domain/event';

const MODULE_KEY = 'decorator:subscribeEvent';

// export function SubscribeEvent<C extends DomainEvent>(
//   evtClazz: new () => C | (new () => C)[]
// ): ClassDecorator {
//   return (target: any) => {
//     console.log('SubscribeEvent:', evtClazz);

//     // 将装饰的类，绑定到该装饰器，用于后续能获取到 class
//     saveModule(MODULE_KEY, target);
//     // 保存一些元数据信息，任意你希望存的东西
//     saveClassMetadata(
//       MODULE_KEY,
//       {
//         evtArray: evtClazz instanceof Array ? evtClazz : [evtClazz],
//       },
//       target
//     );
//     // 指定 IoC 容器创建实例的作用域，这里注册为请求作用域，这样能取到 ctx
//     Scope(ScopeEnum.Request)(target);
//   };
// }

export function SubscribeEvent(evtClazz: any | any[]): ClassDecorator {
  return (target: any) => {
    let checkEventFlag = true;
    if (evtClazz instanceof Array) {
      for (const item of evtClazz) {
        if (isClass(item)) {
          if (item.__proto__ !== DomainEvent) {
            checkEventFlag = false;
            break;
          }
        } else {
          checkEventFlag = false;
        }
      }
    } else {
      if (isClass(evtClazz)) {
        if (evtClazz.__proto__ !== DomainEvent) {
          checkEventFlag = false;
        }
      } else {
        checkEventFlag = false;
      }
    }

    if (checkEventFlag !== true) {
      throw new Error('@SubscribeEvent()注入非法参数');
    }

    if (evtClazz)
      // 将装饰的类，绑定到该装饰器，用于后续能获取到 class
      saveModule(MODULE_KEY, target);
    // 保存一些元数据信息，任意你希望存的东西
    saveClassMetadata(
      MODULE_KEY,
      {
        evtArray: evtClazz instanceof Array ? evtClazz : [evtClazz],
      },
      target
    );
    // 指定 IoC 容器创建实例的作用域，这里注册为请求作用域，这样能取到 ctx
    Scope(ScopeEnum.Request)(target);
  };
}
