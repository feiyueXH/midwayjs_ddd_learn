import { AggregateRoot } from '../../../infrastructure/core/aggregateRoot';
import { OrderItem } from '../entity/orderItem';
import { AddressInfo } from '../valueObject/addressInfo';
import { OrderStatus } from '../valueObject/orderStatus';
import { UserInfo } from '../valueObject/userInfo';

export class Order extends AggregateRoot {
  private orderId: string;
  public getOrderId(): string {
    return this.orderId;
  }
  public setOrderId(v: string): void {
    this.orderId = v;
  }

  private userId: string;
  public getUserId(): string {
    return this.userId;
  }
  public setUserId(v: string): void {
    this.userId = v;
  }

  private userInfo: UserInfo;
  public getUserInfo(): UserInfo {
    return this.userInfo;
  }
  public setUserInfo(v: UserInfo): void {
    this.userInfo = v;
  }

  private addressInfo: AddressInfo;
  public getAddressInfo(): AddressInfo {
    return this.addressInfo;
  }
  public setAddressInfo(v: AddressInfo): void {
    this.addressInfo = v;
  }

  private remark: string;
  public getRemark(): string {
    return this.remark;
  }
  public setRemark(v: string): void {
    this.remark = v;
  }

  private amount: number;
  public getAmount(): number {
    return this.amount;
  }
  public setAmount(v: number): void {
    this.amount = v;
  }

  private createTime: number;
  public getValue(): number {
    return this.createTime;
  }
  public setValue(v: number): void {
    this.createTime = v;
  }

  private orderItems: OrderItem[];
  public getOrderItems(): OrderItem[] {
    return this.orderItems;
  }
  public setOrderItems(v: OrderItem[]): void {
    this.orderItems = v;
  }

  private orderStatus: OrderStatus;
  public getOrderStatus(): OrderStatus {
    return this.orderStatus;
  }
  public setOrderStatus(v: OrderStatus): void {
    this.orderStatus = v;
  }
}
