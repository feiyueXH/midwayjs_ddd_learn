import { IUserRepository } from '../../../domain/user/repository/user';
import { ICommandExecutorBase } from '../../../infrastructure/core/application/command';

export interface ILoginExecutor extends ICommandExecutorBase {
  userRepository: IUserRepository;
}

export interface IRegisterUserExecutor extends ICommandExecutorBase {
  userRepository: IUserRepository;
}
