import { DomainEvent } from '../../../infrastructure/core/event';

export class UserCreatedEvent extends DomainEvent {
  createTime: Date;
  userName: string;
  constructor(userName: string) {
    super(null);
    this.setCreateTime(new Date());
    this.userName = userName;
  }

  getCreateTime(): Date {
    return this.createTime;
  }
  setCreateTime(date: Date): void {
    this.createTime = date;
  }

  toString(): string {
    throw new Error('Method not implemented.');
  }
}
