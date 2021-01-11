import { Body, Controller, Inject, Post, Provide } from '@midwayjs/decorator';
import { UserDTO } from '../../application/dto/user';
import { UserAppService } from '../../application/service/impl/user';

@Provide()
@Controller('/')
export class UserController {
  @Inject()
  userAppService: UserAppService;

  @Post('/users')
  addUser(@Body() user: UserDTO) {
    this.userAppService.addUser(user);
  }

  @Post('/login')
  login(@Body() user: UserDTO) {
    this.userAppService.login(user);
  }
}
