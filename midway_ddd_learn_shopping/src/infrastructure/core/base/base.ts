/**
 * DTO基类
 */
export abstract class DTO {}

/**
 * VO基类
 */
export abstract class VO {}

/**
 * 获取实例对象的某个属性
 * @param obj
 * @param propName
 */
export const getProps: any = <T, K extends keyof T>(obj: T, propName: K) => {
  return obj[propName];
};

/**
 * 设置实例对象的某个属性值
 * @param obj
 * @param propName
 */
export const setProps: any = <T, K extends keyof T, V>(
  obj: T,
  propName: K,
  val: any
) => {
  obj[propName] = val;
};

/**
 * 获取Class的所有可枚举属性
 * @param type
 */
export const getPrototypes = function <T>(clazz: new () => T): Array<string> {
  return Object.getOwnPropertyNames(clazz.prototype);
};

/**
 * 判断是否是一个Class
 * @param target
 */
export const isClass = function (target: any): boolean {
  return typeof target === 'function' && target.toString().startsWith('class');
};

export interface ITargetPoint {
  methodName: string;
  method: () => any;
  clazz: new () => any;
}

export interface IClassProxy {
  before(targetPoint: ITargetPoint): any;
}

export abstract class ClassProxy {
  register<V>(clazz: new () => V): void {
    if (isClass(clazz)) {
      const prototypes = getPrototypes(clazz);
      for (const key of prototypes) {
        if (typeof clazz.prototype[key] === 'function') {
          clazz.prototype[key] = this.before({
            methodName: key,
            method: clazz.prototype[key],
            clazz: clazz,
          });
        }
      }
    }
  }

  abstract before(point: ITargetPoint): any;

  // before(point: ITargetPoint): any {
  //   console.log(`before:${point.methodName}`);
  //   if (/^get/.test(point.methodName)) {
  //     return function (this: new () => any, ...args: any[]) {
  //       return Reflect.apply(point.method, this, args);
  //     };
  //   } else if (/^set/.test(point.methodName)) {
  //     return function (this: new () => any, ...args: any[]) {
  //       return Reflect.apply(point.method, this, args);
  //     };
  //   }
  //   return point.method;
  // }
}
