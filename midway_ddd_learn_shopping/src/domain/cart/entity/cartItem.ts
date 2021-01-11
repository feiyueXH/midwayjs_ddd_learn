import { Entity } from '../../../infrastructure/domainCore/entity';
import { UUID } from '../../../infrastructure/util/uuid';

export class CartItem extends Entity {
  id: UUID;
  quantity: number; //数量
  salePrice: number; //售价

  constructor(goodsId: UUID, quantity: number, salePrice: number) {
    super();

    this.id = goodsId;
    this.setQuantity(quantity);
    this.setSalePrice(salePrice);
  }

  setQuantity(quantity: number): void {
    if (quantity === 0) {
      throw new Error('商品数量不能为0');
    }
    this.quantity = quantity;
  }

  setSalePrice(salePrice: number): void {
    this.salePrice = salePrice;
  }
}
