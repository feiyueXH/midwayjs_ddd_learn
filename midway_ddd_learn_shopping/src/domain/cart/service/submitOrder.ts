import { Provide } from '@midwayjs/decorator';
import { Cart } from '../aggregate/cart';
import { OrderForm } from '../value/orderForm';

@Provide()
export class SubmitOrderService {
  submit(cart: Cart, remark: string): OrderForm {
    const cartItems = cart.cartItems;
    const orderForm = new OrderForm(cartItems, remark);
    return orderForm;
  }
}
