import { UUID } from '../util/uuid';
export class AggregateRoot {
  constructor() {}

  /**
   * 创建
   */
  created(): void {}

  /**
   * 销毁
   */
  destroyed(): void {}
}
