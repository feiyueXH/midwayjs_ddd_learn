import { Controller, Inject, Post, Provide } from '@midwayjs/decorator';
import { CreateOrderCmd } from '../../application/command/order/impl/createOrderCmd';
import { ICommandBus } from '../../infrastructure/core/cqrs/command';
import { HttpHelper } from '../../infrastructure/http/helper';
@Controller('/order')
@Provide()
export class OrderController {
  @Inject()
  commandBus: ICommandBus;

  @Inject()
  httpHelper: HttpHelper;

  @Post()
  async createOrder(): Promise<void> {
    await this.commandBus.execution(new CreateOrderCmd());
    this.httpHelper.success();
  }
}
