import { CommandBase } from '../../../../infrastructure/core/application/command';
import { IRegisterUserCommand } from '../interface';

export class RegisterUserCommand
  extends CommandBase
  implements IRegisterUserCommand {
  username: string;
  password: string;

  constructor(username: string, password: string) {
    super();
    this.username = username;
    this.password = password;
  }
}
