import { Inject, Provide } from '@midwayjs/decorator';
import { MongoDbContext } from '../../../../infrastructure/db/mongodb/dbContext';
import {
  BasicException,
  BasicExceptionCode,
} from '../../../../infrastructure/http/exception/basic';
import { Converter } from '../../../../infrastructure/util/converter';
import { CartVO } from '../../../../infrastructure/vo/cart';
import { ICartQueryService } from '../cart';

@Provide('cartQueryService')
export class CartQueryService implements ICartQueryService {
  @Inject()
  mongoDbContext: MongoDbContext;

  async getCartBuyerId(buyerId: string): Promise<CartVO> {
    console.log('getCartBuyerId');
    const cart = await this.mongoDbContext.get('cart', { buyerId: buyerId });
    console.log(cart);
    if (cart) {
      await cart.populate('cartItems').execPopulate();
      return Converter.pojoConvertEntity(cart, CartVO); //将PO转为VO
    } else {
      throw new BasicException(BasicExceptionCode.DB_FAIL_FIND, '查无购物车!');
    }
  }
}
