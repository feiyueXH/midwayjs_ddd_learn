import { DomainEvent } from '../../../infrastructure/core/ddd/event';

export class OrderCreatedEvent extends DomainEvent {
  constructor(source) {
    super(source);
    this.orderId = source.orderId;
  }
  private orderId: string;
  public getOrderId(): string {
    return this.orderId;
  }
  public setOrderId(v: string): void {
    this.orderId = v;
  }
}
