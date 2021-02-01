import { ValueObject } from '../../../../../infrastructure/core/ddd/valueObject';

export class Product extends ValueObject {
  constructor(
    productId?: string,
    productName?: string,
    price?: number,
    stock?: number
  ) {
    super();
    productId && this.setProductId(productId);
    productName && this.setProductName(productName);
    price && this.setPrice(price);
    stock && this.setStock(stock);
  }

  private productId: string;
  public getProductId(): string {
    return this.productId;
  }
  private setProductId(v: string): void {
    this.productId = v;
  }

  private productName: string;
  public getProductName(): string {
    return this.productName;
  }
  private setProductName(v: string): void {
    this.productName = v;
  }

  private price: number;
  public getPrice(): number {
    return this.price;
  }
  private setPrice(v: number): void {
    this.price = v;
  }

  private stock: number;
  public getStock(): number {
    return this.stock;
  }
  private setStock(v: number): void {
    this.stock = v;
  }
}
