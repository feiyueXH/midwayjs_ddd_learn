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
export const isClass = function <T>(target: T): boolean {
  return typeof target === 'function' && target.toString().startsWith('class');
};

/**
 * 首字符大写
 * @param str
 */
export const firstToUpper = function (str: string): string {
  return str.replace(/( |^)[a-z]/g, L => L.toUpperCase());
};

/**
 * 首字符小写
 * @param str
 */
export const firstToLower = function (str: string): string {
  return str.replace(/( |^)[A-Z]/g, L => L.toLowerCase());
};

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
export const setProps: any = <T, K extends keyof T>(
  obj: T,
  propName: K,
  val: any
) => {
  obj[propName] = val;
};

/**
 * 内容转换器
 */
export class Converter {
  /**
   * 将实体的值拷贝到一个简单javascript对象
   * @param entity 实例
   * @param clazz 类
   */
  public static entityConvertPojo<E, V>(entity: E, clazz: new () => V): V {
    // 判断是不是类
    if (isClass(clazz)) {
      //创建实例
      const newPojo = new clazz();
      //获取指定Class中所有可枚举的属性,过滤枚举属性中的构造器
      const prototypes = getPrototypes(clazz).filter(
        key => key !== 'constructor'
      );
      //为新建的实例赋值
      for (const key of prototypes) {
        const _key = 'get' + firstToUpper(key);
        const fn = getProps(entity, _key);
        if (typeof fn === 'function') {
          setProps(newPojo, key, fn.call(entity));
        }
      }
      return newPojo;
    } else {
      throw new Error(`${clazz} not a Class`);
    }
  }

  public static entityConvertEntity<E, V>(entity: E, clazz: new () => V): V {
    // 判断是不是类
    if (isClass(clazz)) {
      //创建实例
      const newEntity = new clazz();
      //获取指定Class中所有可枚举的属性,并过滤枚举属性写入以外的属性
      const reg = /^set/;
      const prototypes = getPrototypes(clazz).filter(key => reg.test(key));
      //为新建的实例赋值
      for (const setKey of prototypes) {
        const getKey = `get${setKey.slice(3)}`; //截取set后面的字段名,与get进行拼接
        const getFn = getProps(entity, getKey);
        const setFn = getProps(newEntity, setKey);

        if (typeof getFn === 'function' && typeof setFn === 'function') {
          setFn.call(newEntity, getFn.call(entity)); //调用entity的get方法得到值,调用newEntity的set方法进行赋值
        }
      }
      return newEntity;
    } else {
      throw new Error(`${clazz} is not a Class`);
    }
  }

  public static pojoConvertEntity<E, V>(pojo: E, clazz: new () => V): V {
    // 判断是不是类
    if (isClass(clazz)) {
      //创建实例
      const newEntity = new clazz();
      //获取指定Class中所有可枚举的属性,并过滤枚举属性写入以外的属性
      const reg = /^set/;
      const prototypes = getPrototypes(clazz).filter(key => reg.test(key));
      //为新建的实例赋值
      for (const setKey of prototypes) {
        const setFn = getProps(newEntity, setKey);
        const key = firstToLower(setKey.slice(3));
        if (typeof setFn === 'function') {
          console.log(`${key},getProps(pojo, key):${getProps(pojo, key)}`);
          setFn.call(newEntity, getProps(pojo, key)); //调用entity的get方法得到值,调用newEntity的set方法进行赋值
        }
      }
      return newEntity;
    } else {
      throw new Error(`${clazz} is not a Class`);
    }
  }

  // public static pojoConvertPojo<E, V>(pojo: E, clazz: new () => V): V {
  //   // 判断是不是类
  //   if (isClass(clazz)) {
  //     //创建实例
  //     const newPojo = new clazz();
  //     //获取指定Class中所有可枚举的属性,过滤枚举属性中的构造器
  //     const prototypes = getPrototypes(clazz).filter(
  //       key => key !== 'constructor'
  //     );
  //     //为新建的实例赋值
  //     for (const key of prototypes) {
  //       setProps(newPojo, key, getProps(pojo, key));
  //     }
  //     return newPojo;
  //   } else {
  //     throw new Error(`${clazz} is not a Class`);
  //   }
  // }
}
