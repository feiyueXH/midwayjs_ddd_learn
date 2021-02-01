import { ValueObject } from '../../../../../infrastructure/core/ddd/valueObject';

export class AddressInfo extends ValueObject {
  private addressCode: string;
  public getAddressCode(): string {
    return this.addressCode;
  }
  public setAddressCode(v: string): void {
    this.addressCode = v;
  }

  private address: string;
  public getAddress(): string {
    return this.address;
  }
  public setAddress(v: string): void {
    this.address = v;
  }

  private province: string;
  public getProvince(): string {
    return this.province;
  }
  public setProvince(v: string): void {
    this.province = v;
  }

  private city: string;
  public getCity(): string {
    return this.city;
  }
  public setCity(v: string): void {
    this.city = v;
  }

  private district: string;
  public getDistrict(): string {
    return this.district;
  }
  public setDistrict(v: string): void {
    this.district = v;
  }
}
