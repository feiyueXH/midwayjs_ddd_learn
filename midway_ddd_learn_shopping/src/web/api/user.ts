import {
  ALL,
  Body,
  Controller,
  Inject,
  Post,
  Provide,
} from '@midwayjs/decorator';
import { UserDTO } from '../../infrastructure/dto/user';
import { IUserAppService } from '../../application/service/user';

@Provide()
@Controller('/')
export class UserController {
  @Inject()
  userAppService: IUserAppService;

  @Post('/users')
  async addUser(@Body(ALL) user: UserDTO): Promise<string> {
    await this.userAppService.register(user);
    return '新增用户成功';
  }

  @Post('/login')
  async login(@Body(ALL) user: UserDTO): Promise<string> {
    await this.userAppService.login(user);
    return '登陆成功!';
  }
}
