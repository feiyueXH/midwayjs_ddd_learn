import { AggregateRoot } from '../../../infrastructure/domainCore/aggregateRoot';
import { UUID } from '../../../infrastructure/util/uuid';
import { CartItem } from '../entity/cartItem';
import { GoodsInfo } from '../value/goodsInfo';

export class Cart extends AggregateRoot {
  id: UUID; //购物车编码
  userId: UUID; //用户编码
  cartItems: Array<CartItem>; //购物车子项集合

  constructor(id: UUID, userId: UUID) {
    super();
    this.id = id;
    this.userId = userId;
    this.cartItems = new Array<CartItem>(); //加入购物车商品
  }

  addCartItem(goods: GoodsInfo, quantity: number): void {
    const cartItem = new CartItem(goods.id, quantity, goods.price);
    //实现添加购物车
    const existItem = this.cartItems.find(item => item.id === goods.id);
    if (!existItem) {
      this.cartItems.push(cartItem);
    } else {
      existItem.setQuantity(existItem.quantity + cartItem.quantity);
      existItem.setSalePrice(cartItem.salePrice);
    }
  }

  removeCartItem(goodsId: UUID): void {
    //移除购物车商品
    const index = this.cartItems.findIndex(item => item.id === goodsId);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
    }
  }
}
