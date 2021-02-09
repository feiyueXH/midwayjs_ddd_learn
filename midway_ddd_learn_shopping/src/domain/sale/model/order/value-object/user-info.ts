import { ValueObject } from '../../../../../infrastructure/core/domain/value-object';

export class UserInfo extends ValueObject {
  private name: string;
  public getName(): string {
    return this.name;
  }
  public setName(v: string): void {
    this.name = v;
  }

  private phone: string;
  public getPhone(): string {
    return this.phone;
  }
  public setPhone(v: string): void {
    this.phone = v;
  }
}
