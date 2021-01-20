import { AggregateRoot } from '../../../infrastructure/core/aggregateRoot';
import { CartItem } from '../entity/cartItem';

export class Cart extends AggregateRoot {
  private cartId: string;
  public getCartId(): string {
    return this.cartId;
  }
  public setCartId(v: string): void {
    this.cartId = v;
  }

  private buyerId: string;
  public getBuyerId(): string {
    return this.buyerId;
  }
  public setBuyerId(v: string): void {
    this.buyerId = v;
  }

  private cartItems: Array<CartItem>;
  public getCartItems(): Array<CartItem> {
    return this.cartItems;
  }
  public setCartItems(v: Array<CartItem>): void {
    this.cartItems = v;
  }

  /**
   * 添加购物车商品
   * @param productId
   * @param price
   * @param count
   */
  addCartItem(productId: string, price: number, count: number): void {
    //实现添加购物车
    const existItem = this.cartItems.find(
      item => item.getProductId() === productId
    );
    if (!existItem) {
      const cartItem = new CartItem(productId, price, count);
      this.cartItems.push(cartItem);
    } else {
      existItem.setCount(existItem.getCount() + count);
      existItem.setPrice(price);
    }
  }

  /**
   * 移除购物车商品
   * @param productId
   * @param price
   * @param count
   */
  removeCartItem(productId: string): void {
    const index = this.cartItems.findIndex(
      item => item.getProductId() === productId
    );
    if (index !== -1) {
      this.cartItems.splice(index, 1);
    }
  }

  /**
   *
   * @param productId 判断是否购物车存在商品
   */
  existCartItem(productId: string): boolean {
    return (
      this.cartItems.findIndex(item => item.getProductId() === productId) !== -1
    );
  }
}
