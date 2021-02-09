import { Entity } from './entity';

export interface IAggregateRoot {
  /**
   * 创建
   */
  created(): void;

  /**
   * 销毁
   */
  destroyed(): void;
}

export class AggregateRoot extends Entity implements IAggregateRoot {
  constructor() {
    super();
  }

  /**
   * 创建
   */
  created(): void {}

  /**
   * 销毁
   */
  destroyed(): void {}
}
