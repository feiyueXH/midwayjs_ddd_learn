export interface IOptions {
  [propName: string]: any;
}

export interface IUnitOfWork {
  /**
   * 这里是工作单元的唯一标志，暂时先定义并赋值，后面可能会有用到。目前打算先做成请求上下文共用一个单元，但后面如果将一个请求拆分成多个Command，甚至更细的粒度，就可能需要这个唯一标志来做识别。
   */
  id: string;

  /**
   * 整个工作单元进行提交
   */
  commit(): Promise<void>;

  /**
   * 整个工作单元进行回滚
   */
  abort(): Promise<void>;
}
