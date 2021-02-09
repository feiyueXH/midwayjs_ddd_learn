import { Provide } from '@midwayjs/decorator';
import { Cart } from '../../../../domain/sale/model/cart/cart';
import { ICartRepository } from '../../../../domain/sale/repository/cart';
import {
  BasicException,
  BasicExceptionCode,
} from '../../../../infrastructure/common/http/exception/basic';
import {
  CommandBase,
  CommandExecutorBase,
} from '../../../../infrastructure/core/application/command';
import { SubscribeCommand } from '../../../../infrastructure/decorator/command';
import { RemoveCartItemCommand } from '../../../command/sale/impl/remove-cart-item.command';
import { IRemoveCartItemExecutor } from '../interface';

@SubscribeCommand(RemoveCartItemCommand)
@Provide()
export class RemoveCartItemExecutor
  extends CommandExecutorBase
  implements IRemoveCartItemExecutor {
  cartRepository: ICartRepository;
  async executeCommand<C extends CommandBase>(command: C): Promise<void> {
    if (command instanceof RemoveCartItemCommand) {
      const cart: Cart = await this.cartRepository.getByBuyerId(command.userId);
      if (!cart) {
        throw new BasicException(
          BasicExceptionCode.DB_FAIL_FIND,
          '查询不到购物车!'
        );
      }

      if (!cart.existCartItem(command.productId)) {
        throw new BasicException(
          BasicExceptionCode.DB_FAIL_FIND,
          '购物车不存在该商品!'
        );
      }

      cart.removeCartItem(command.productId);
      await this.cartRepository.save(cart);
    }
    throw new Error('Method not implemented.');
  }
}
