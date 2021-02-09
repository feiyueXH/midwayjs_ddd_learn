import { AggregateRoot } from '../../../../infrastructure/core/domain/aggregate-root';
import { CartItem } from './entity/cartItem';
import { Product } from './value-object/product';

export class Cart extends AggregateRoot {
  constructor(cartId?: string, buyerId?: string) {
    super();
    cartId && this.setCartId(cartId);
    buyerId && this.setBuyerId(buyerId);
    this.cartItems = new Array<CartItem>();
  }

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
  // private setCartItems(v: Array<CartItem>): void {
  //   this.cartItems = v;
  // }

  /**
   * 添加购物车商品
   * @param productId
   * @param price
   * @param count
   */
  addCartItem(product: Product, count: number): void {
    //实现添加购物车
    console.log(` this.cartItems:${this.cartItems}`);
    console.log(` product.getProductId():${product.getProductId()}`);
    const existItem = this.cartItems.find(
      item => item.getProductId() === product.getProductId()
    );
    console.log(`existItem:${existItem}`);
    if (!existItem) {
      const cartItem = new CartItem(
        product.getProductId(),
        product.getPrice(),
        count
      );
      this.cartItems.push(cartItem);
    } else {
      existItem.setCount(existItem.getCount() + count);
      existItem.setPrice(product.getPrice());
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
