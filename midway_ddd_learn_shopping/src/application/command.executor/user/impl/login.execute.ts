import { Provide } from '@midwayjs/decorator';
import { User } from '../../../../domain/user/model/user/user';
import { IUserRepository } from '../../../../domain/user/repository/user';
import {
  CommandBase,
  CommandExecutorBase,
} from '../../../../infrastructure/core/application/command';
import { ICommandBus } from '../../../../infrastructure/core/command-bus';
import { SubscribeCommand } from '../../../../infrastructure/decorator/command';
import { LoginCommand } from '../../../command/user/impl/login.command';
import { ILoginExecutor } from '../interface';

@SubscribeCommand(LoginCommand)
@Provide()
export class LoginExecutor
  extends CommandExecutorBase
  implements ILoginExecutor {
  commandBus: ICommandBus;
  userRepository: IUserRepository;
  async executeCommand<C extends CommandBase>(command: C): Promise<void> {
    if (command instanceof LoginCommand) {
      const _user: User = await this.userRepository.get(command.username);
      if (!_user) {
        throw new Error('账号不存在!');
      }
      if (!_user.equalPassword(command.password)) {
        throw new Error('密码错误!');
      }
    } else {
      throw new Error('未定义的命令');
    }
  }
}
