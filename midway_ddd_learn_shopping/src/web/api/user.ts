import {
  ALL,
  Body,
  Controller,
  Inject,
  Post,
  Provide,
} from '@midwayjs/decorator';
import { LoginCommand } from '../../application/command/user/impl/login.command';
import { RegisterUserCommand } from '../../application/command/user/impl/register-user.command';
import { HttpHelper } from '../../infrastructure/common/http/helper';
import { ICommandBus } from '../../infrastructure/core/command-bus';
import { UserDTO } from '../dto/user';

@Provide()
@Controller('/')
export class UserController {
  @Inject()
  commandBus: ICommandBus;

  @Inject()
  httpHelper: HttpHelper;

  @Post('/users')
  async addUser(@Body(ALL) user: UserDTO): Promise<void> {
    //通过命令总线发起注册用户命令
    await this.commandBus.send(
      new RegisterUserCommand(user.userName, user.passWord)
    );
    this.httpHelper.success(null, '新增用户成功');
  }

  @Post('/login')
  async login(@Body(ALL) user: UserDTO): Promise<void> {
    //通过命令总线发起注册用户命令
    await this.commandBus.send(new LoginCommand(user.userName, user.passWord));
    this.httpHelper.success(null, '登陆成功');
  }
}
