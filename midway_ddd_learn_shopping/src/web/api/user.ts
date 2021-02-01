import {
  ALL,
  Body,
  Controller,
  Inject,
  Post,
  Provide,
} from '@midwayjs/decorator';
import { UserDTO } from '../../infrastructure/dto/user';
import { IUserCommandService } from '../../application/command/service/user';
import { HttpHelper } from '../../infrastructure/http/helper';

@Provide()
@Controller('/')
export class UserController {
  @Inject()
  userCommandService: IUserCommandService;

  @Inject()
  httpHelper: HttpHelper;

  @Post('/users')
  async addUser(@Body(ALL) user: UserDTO): Promise<void> {
    await this.userCommandService.register(user);
    this.httpHelper.success(null, '新增用户成功');
  }

  @Post('/login')
  async login(@Body(ALL) user: UserDTO): Promise<void> {
    await this.userCommandService.login(user);
    this.httpHelper.success(null, '登陆成功');
  }
}
