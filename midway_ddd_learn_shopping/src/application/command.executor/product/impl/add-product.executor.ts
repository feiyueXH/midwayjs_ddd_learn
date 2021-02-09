import { Inject, Provide } from '@midwayjs/decorator';
import { Product } from '../../../../domain/product/model/product/product';
import { IProductRepository } from '../../../../domain/product/repository/product';
import { Converter } from '../../../../infrastructure/common/util/converter';
import { UUID } from '../../../../infrastructure/common/util/uuid';
import {
  CommandBase,
  CommandExecutorBase,
} from '../../../../infrastructure/core/application/command';
import { SubscribeCommand } from '../../../../infrastructure/decorator/command';
import { AddProductCommand } from '../../../command/product/impl/add-product.command';
import { IAddProductExecutor } from '../interface';

/**
 * 添加商品命令处理器
 */
//订阅命令
@SubscribeCommand(AddProductCommand)
@Provide()
export class AddProductExecutor
  extends CommandExecutorBase
  implements IAddProductExecutor {
  //商品仓储
  @Inject()
  productRepository: IProductRepository;

  //执行命令函数
  async executeCommand<C extends CommandBase>(command: C): Promise<void> {
    if (command instanceof AddProductCommand) {
      const _product = Converter.pojoConvertEntity(command, Product);
      _product.setProductId(UUID.randomUUID());
      await this.productRepository.save(_product);
    } else {
      throw new Error('未定义的命令');
    }
  }
}
