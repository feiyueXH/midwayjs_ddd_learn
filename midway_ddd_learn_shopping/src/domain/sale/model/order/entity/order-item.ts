import { Entity } from '../../../../../infrastructure/core/domain/entity';

export class OrderItem extends Entity {
  private productId: string;
  public getProductId(): string {
    return this.productId;
  }
  public setProductId(v: string): void {
    this.productId = v;
  }

  private productName: string;
  public getValue(): string {
    return this.productName;
  }
  public setValue(v: string): void {
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
