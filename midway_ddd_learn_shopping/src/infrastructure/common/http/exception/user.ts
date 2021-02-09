import { BasicException, BasicExceptionCode, CodeEnumItemType } from './basic';

export const UserExceptionCode = {
  USERNAME_ERR: ['USER0001', '用户名错误'],
  USERNAME_LEN: ['USER0002', '用户名长度不符合要求'],
  PASSWORD_ERR: ['USER0003', '密码错误'],
  PASSWORD_LEN: ['USER0004', '密码长度不符合规范'],
  ...BasicExceptionCode,
} as const;

export class UserException extends BasicException {
  constructor(enumItem: CodeEnumItemType, msg: string, httpCode = 500) {
    super(enumItem, msg, httpCode);
    this.setMap(UserExceptionCode);
    this.check(enumItem, msg, httpCode);
  }
}
