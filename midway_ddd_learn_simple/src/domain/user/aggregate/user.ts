import { AggregateRoot } from '../../../infrastructure/domainCore/aggregateRoot';
import { UUID } from '../../../infrastructure/util/uuid';

export class User extends AggregateRoot {
  userId: UUID;
  userName: string;
  //密码不仅不可见 还需要加密保存,加密保存有空再做
  private passWord: string;

  constructor(
    userId: UUID = UUID.randomUUID(),
    userName: string,
    passWord: string
  ) {
    super();
    this.userId = userId;
    this.setUserName(userName);
    this.setPassWord(passWord);
  }

  setUserName(userName: string): void {
    if (userName.length < 6) {
      throw new Error('账号长度至少6位数!');
    }
    this.userName = userName;
  }

  setPassWord(passWord: string): void {
    if (passWord.length < 6) {
      throw new Error('密码长度至少6位数!');
    }
    this.passWord = passWord;
  }

  equalPassword(passWord: string): boolean {
    return this.passWord === passWord;
  }
}
