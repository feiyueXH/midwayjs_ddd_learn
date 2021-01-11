import { AggregateRoot } from '../../../infrastructure/domainCore/aggregateRoot';
import { UUID } from '../../../infrastructure/util/uuid';

export class Product extends AggregateRoot {
  productId: UUID; //商品编码
  productName: string; //商品名称
  stock: number; //商品库存

  constructor(productId: UUID, productName: string, stock: number) {
    super();
    this.productId = productId;
    this.productName = productName;
    this.stock = stock;
  }

  /**
   * 修改库存
   * @param stock
   */
  modifyStock(stock: number): void {
    this.stock = stock;
  }
}
