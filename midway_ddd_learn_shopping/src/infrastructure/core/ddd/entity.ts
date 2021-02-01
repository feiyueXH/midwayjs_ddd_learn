export interface IEntity {
  /**
   * 创建
   */
  created(): void;

  /**
   * 销毁
   */
  destroyed(): void;
}

export class Entity implements IEntity {
  /**
   * 创建
   */
  created(): void {}

  /**
   * 销毁
   */
  destroyed(): void {}
}
