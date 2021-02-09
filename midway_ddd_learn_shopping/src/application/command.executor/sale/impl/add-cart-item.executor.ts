import { Inject, Provide } from '@midwayjs/decorator';
import { IProductRepository } from '../../../../domain/product/repository/product';
import { Cart } from '../../../../domain/sale/model/cart/cart';
import { ICartRepository } from '../../../../domain/sale/repository/cart';
import { Converter } from '../../../../infrastructure/common/util/converter';
import { UUID } from '../../../../infrastructure/common/util/uuid';
import {
  CommandBase,
  CommandExecutorBase,
} from '../../../../infrastructure/core/application/command';
import { SubscribeCommand } from '../../../../infrastructure/decorator/command';
import { AddCartItemCommand } from '../../../command/sale/impl/add-cart-item.command';
import { IAddCartItemExecutor } from '../interface';
import { Product as VProduct } from '../../../../domain/sale/model/cart/value-object/product';
import { Product as AProduct } from '../../../../domain/product/model/product/product';
import {
  BasicException,
  BasicExceptionCode,
} from '../../../../infrastructure/common/http/exception/basic';

@SubscribeCommand(AddCartItemCommand)
@Provide()
export class AddCartItemExecutor
  extends CommandExecutorBase
  implements IAddCartItemExecutor {
  @Inject()
  productRepository: IProductRepository;
  @Inject()
  cartRepository: ICartRepository;
  async executeCommand<C extends CommandBase>(command: C): Promise<void> {
    if (command instanceof AddCartItemCommand) {
      let cart: Cart = await this.cartRepository.getByBuyerId(command.userId);
      if (!cart) {
        cart = new Cart(UUID.randomUUID(), command.userId);
      }

      const product: AProduct = await this.productRepository.getById(
        command.productId
      );
      if (!product) {
        throw new BasicException(
          BasicExceptionCode.DB_FAIL_FIND,
          '不存在该商品!'
        );
      }

      cart.addCartItem(
        Converter.entityConvertEntity(product, VProduct),
        command.count
      );
      await this.cartRepository.save(cart);
    } else {
      throw new Error('未定义的命令');
    }
  }
}
