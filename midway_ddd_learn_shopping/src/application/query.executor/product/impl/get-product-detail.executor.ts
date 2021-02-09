import { Inject, Provide } from '@midwayjs/decorator';
import {
  QueryBase,
  QueryExecutorBase,
} from '../../../../infrastructure/core/application/query';
import { MongoDbContext } from '../../../../infrastructure/db/mongodb/db-context';
import { SubscribeQuery } from '../../../../infrastructure/decorator/query';
import { GetProductDetailQuery } from '../../../query/product/impl/get-product-detail.query';
import { IGetProductDetailExecutor } from '../interface';

@SubscribeQuery(GetProductDetailQuery)
@Provide()
export class GetProductDetailExecutor
  extends QueryExecutorBase
  implements IGetProductDetailExecutor {
  @Inject('mongoDbContext')
  dbContext: MongoDbContext;
  async executeQuery<Q extends QueryBase>(query: Q): Promise<any> {
    if (query instanceof GetProductDetailQuery) {
      return await this.dbContext.get('product', {
        productId: query.productId,
      });
    } else {
      throw new Error('未处理的查询!');
    }
  }
}
