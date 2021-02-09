import { ICommandBase } from '../../../infrastructure/core/application/command';

export interface IRegisterUserCommand extends ICommandBase {
  username: string;
  password: string;
}

export interface ILoginCommand extends ICommandBase {
  username: string;
  password: string;
}
