import { Inject, Provide } from '@midwayjs/decorator';
import {
  QueryBase,
  QueryExecutorBase,
} from '../../../../infrastructure/core/application/query';
import { MongoDbContext } from '../../../../infrastructure/db/mongodb/db-context';
import { SubscribeQuery } from '../../../../infrastructure/decorator/query';
import { GetCartDetailQuery } from '../../../query/sale/impl/get-cart-detail.query';
import { IGetCartDetailExecutor } from '../interface';
@SubscribeQuery(GetCartDetailQuery)
@Provide()
export class GetCartDetailExecutor
  extends QueryExecutorBase
  implements IGetCartDetailExecutor {
  @Inject('mongoDbContext')
  dbContext: MongoDbContext;
  async executeQuery<Q extends QueryBase>(query: Q): Promise<any> {
    if (query instanceof GetCartDetailQuery) {
      this.dbContext.switchDatabase('admin');
      //切换Model,进行关联查询
      return await (await this.dbContext.get('cart', { buyerId: query.userId }))
        .populate('cartItems')
        .execPopulate();
    }
    throw new Error('Method not implemented.');
  }
}
