export interface IAppService {
  /**
   * 创建
   */
  created(): void;

  /**
   * 销毁
   */
  destroyed(): void;
}

export class AppService implements IAppService {
  /**
   * 创建
   */
  created(): void {}

  /**
   * 销毁
   */
  destroyed(): void {}
}
