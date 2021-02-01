import { AggregateRoot } from '../../../../infrastructure/core/ddd/aggregateRoot';

export class User extends AggregateRoot {
  constructor(userId?: string, userName?: string, passWord?: string) {
    super();
    userId && this.setUserId(userId);
    userName && this.setUserName(userName);
    passWord && this.setPassWord(passWord);
  }

  private userId: string;
  public getUserId(): string {
    return this.userId;
  }
  public setUserId(v: string): void {
    this.userId = v;
  }

  private userName: string;
  public getUserName(): string {
    return this.userName;
  }
  public setUserName(userName: string): void {
    if (userName.length < 6) {
      throw new Error('账号长度至少6位数!');
    }
    this.userName = userName;
  }

  private passWord: string;
  public getPassWord(): string {
    return this.passWord;
  }
  public setPassWord(passWord: string): void {
    if (passWord.length < 6) {
      throw new Error('密码长度至少6位数!');
    }
    this.passWord = passWord;
  }

  equalPassword(passWord: string): boolean {
    return this.passWord === passWord;
  }
}
