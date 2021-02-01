export interface IValueObject {
  /**
   * 创建
   */
  created(): void;

  /**
   * 销毁
   */
  destroyed(): void;
}

export class ValueObject implements IValueObject {
  /**
   * 创建
   */
  created(): void {}

  /**
   * 销毁
   */
  destroyed(): void {}
}
