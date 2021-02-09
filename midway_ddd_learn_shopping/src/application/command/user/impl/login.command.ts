import { CommandBase } from '../../../../infrastructure/core/application/command';
import { ILoginCommand } from '../interface';

export class LoginCommand extends CommandBase implements ILoginCommand {
  username: string;
  password: string;
  constructor(username: string, password: string) {
    super();
    this.username = username;
    this.password = password;
  }
}
