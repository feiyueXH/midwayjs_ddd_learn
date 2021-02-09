import { VO } from '../../infrastructure/core/base/base';

export class CartItemVO extends VO {
  private productId: string;
  public getProductId(): string {
    return this.productId;
  }
  public setProductId(v: string): void {
    this.productId = v;
  }

  private productName: string;
  public getProductName(): string {
    return this.productName;
  }
  public setProductName(v: string): void {
    this.productName = v;
  }

  private price: number;
  public getPrice(): number {
    return this.price;
  }
  public setPrice(v: number): void {
    this.price = v;
  }

  private count: number;
  public getCount(): number {
    return this.count;
  }
  public setCount(v: number): void {
    this.count = v;
  }
}

export class CartVO extends VO {
  constructor(cartId?: string, cartItems?: CartItemVO[]) {
    super();
    this.setCartId(cartId);
    this.setCartItems(cartItems);
  }
  private cartId: string;
  public getCartId(): string {
    return this.cartId;
  }
  public setCartId(v: string): void {
    this.cartId = v;
  }

  private cartItems: Array<CartItemVO>;
  public getCartItems(): Array<CartItemVO> {
    return this.cartItems;
  }
  public setCartItems(v: Array<CartItemVO>): void {
    this.cartItems = v;
  }
}
