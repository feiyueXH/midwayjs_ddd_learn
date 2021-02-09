import { Inject, Provide } from '@midwayjs/decorator';
import { User } from '../../../../domain/user/model/user/user';
import { IUserRepository } from '../../../../domain/user/repository/user';
import { UUID } from '../../../../infrastructure/common/util/uuid';
import {
  CommandBase,
  CommandExecutorBase,
} from '../../../../infrastructure/core/application/command';
import { SubscribeCommand } from '../../../../infrastructure/decorator/command';
import { RegisterUserCommand } from '../../../command/user/impl/register-user.command';
import { IRegisterUserExecutor } from '../interface';

@SubscribeCommand(RegisterUserCommand)
@Provide()
export class RegisterUserExecutor
  extends CommandExecutorBase
  implements IRegisterUserExecutor {
  @Inject()
  userRepository: IUserRepository;
  async executeCommand<C extends CommandBase>(command: C): Promise<void> {
    if (command instanceof RegisterUserCommand) {
      if ((await this.userRepository.get(command.username)) !== null) {
        throw new Error('账户已存在!');
      }
      const _user = new User(
        UUID.randomUUID(),
        command.username,
        command.password
      );
      await this.userRepository.save(_user);
    } else {
      throw new Error('未定义的命令');
    }
  }
}
