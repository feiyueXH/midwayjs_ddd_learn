import { Inject, Provide } from '@midwayjs/decorator';
import { IProductRepository } from '../../../../domain/product/repository/product';
import {
  CommandBase,
  CommandExecutorBase,
} from '../../../../infrastructure/core/application/command';
import { SubscribeCommand } from '../../../../infrastructure/decorator/command';
import { RemoveProductCommand } from '../../../command/product/impl/remove-product.command';
import { IRemoveProductExecutor } from '../interface';
/**
 * 移除商品命令处理者
 */
@SubscribeCommand(RemoveProductCommand)
@Provide()
export class RemoveProductExecutor
  extends CommandExecutorBase
  implements IRemoveProductExecutor {
  @Inject()
  productRepository: IProductRepository;
  async executeCommand<C extends CommandBase>(command: C): Promise<void> {
    if (command instanceof RemoveProductCommand) {
      await this.productRepository.removeById(command.productId);
    } else {
      throw new Error('未定义的命令');
    }
  }
}
