import {
  Scope,
  ScopeEnum,
  saveClassMetadata,
  saveModule,
} from '@midwayjs/decorator';

const MODULE_KEY = 'decorator:subscribeQuery';

export function SubscribeQuery<C extends any>(queryClazz: C): ClassDecorator {
  return (target: any) => {
    console.log('SubscribeQuery:', queryClazz);

    // 将装饰的类，绑定到该装饰器，用于后续能获取到 class
    saveModule(MODULE_KEY, target);
    // 保存一些元数据信息，任意你希望存的东西
    saveClassMetadata(
      MODULE_KEY,
      {
        queryArray: queryClazz instanceof Array ? queryClazz : [queryClazz],
      },
      target
    );
    // 指定 IoC 容器创建实例的作用域，这里注册为请求作用域，这样能取到 ctx
    Scope(ScopeEnum.Request)(target);
  };
}
