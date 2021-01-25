import { DomainEvent } from '../../../infrastructure/core/event';

export class OrderConfirmEvent extends DomainEvent {
  private orderId: string;
  public getOrderId(): string {
    return this.orderId;
  }
  public setOrderId(v: string): void {
    this.orderId = v;
  }
}
