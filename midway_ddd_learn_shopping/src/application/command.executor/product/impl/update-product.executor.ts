import { Inject, Provide } from '@midwayjs/decorator';
import { Product } from '../../../../domain/product/model/product/product';
import { IProductRepository } from '../../../../domain/product/repository/product';
import { Converter } from '../../../../infrastructure/common/util/converter';
import {
  CommandBase,
  CommandExecutorBase,
} from '../../../../infrastructure/core/application/command';
import { SubscribeCommand } from '../../../../infrastructure/decorator/command';
import { UpdateProductCommand } from '../../../command/product/impl/update-product.command';
import { IUpdateProductExecutor } from '../interface';

@SubscribeCommand(UpdateProductCommand)
@Provide()
export class UpdateProductExecutor
  extends CommandExecutorBase
  implements IUpdateProductExecutor {
  @Inject()
  productRepository: IProductRepository;
  async executeCommand<C extends CommandBase>(command: C): Promise<void> {
    if (command instanceof UpdateProductCommand) {
      await this.productRepository.save(
        Converter.pojoConvertEntity(command, Product)
      );
    } else {
      throw new Error('未处理的命令!');
    }
  }
}
