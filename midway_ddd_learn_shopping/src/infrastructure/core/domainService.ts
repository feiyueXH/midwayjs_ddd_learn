export interface IDomainService {
  /**
   * 创建
   */
  created(): void;

  /**
   * 销毁
   */
  destroyed(): void;
}

export class DomainService {
  /**
   * 创建
   */
  created(): void {}

  /**
   * 销毁
   */
  destroyed(): void {}
}
