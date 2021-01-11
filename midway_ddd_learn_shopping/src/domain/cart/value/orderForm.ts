import { UUID } from '../../../infrastructure/util/uuid';
import { CartItem } from '../entity/cartItem';

export class OrderForm {
  remark: string; //订单备注
  cartItems: Array<CartItem>; //商品列表
  amount: number;

  constructor(cartItems, remark) {
    let amount = 0;
    for (const item of cartItems) {
      amount += item.quantity * item.salePrice;
    }

    this.cartItems = cartItems;
    this.amount = amount;
    this.remark = remark;
  }
}
