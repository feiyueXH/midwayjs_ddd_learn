import { Controller, Inject, Post, Provide } from '@midwayjs/decorator';
import { CreateOrderCommand } from '../../application/command/sale/impl/create-order.command';
import { HttpHelper } from '../../infrastructure/common/http/helper';
import { ICommandBus } from '../../infrastructure/core/command-bus';
@Controller('/order')
@Provide()
export class OrderController {
  @Inject()
  commandBus: ICommandBus;

  @Inject()
  httpHelper: HttpHelper;

  @Post()
  async createOrder(): Promise<void> {
    //通过命令总线发起创建订单命令
    await this.commandBus.send(new CreateOrderCommand([]));
    this.httpHelper.success(null, '创建订单成功');
  }
}
