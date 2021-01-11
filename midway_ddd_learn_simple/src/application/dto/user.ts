import { Rule, RuleType } from '@midwayjs/decorator';

export class UserDTO {
  @Rule(RuleType.string().required())
  userName: string;

  @Rule(RuleType.string().max(10))
  passWord: string;
}
