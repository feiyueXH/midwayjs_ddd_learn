import { Entity } from '../../../../../infrastructure/core/domain/entity';
export class CartItem extends Entity {
  constructor(productId: string, price: number, count: number) {
    super();
    this.productId = productId;
    this.price = price;
    this.count = count;
  }

  private productId: string;
  public getProductId(): string {
    return this.productId;
  }
  public setProductId(v: string): void {
    this.productId = v;
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
