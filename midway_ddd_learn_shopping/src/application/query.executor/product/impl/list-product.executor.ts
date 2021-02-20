//src\application\query.executor\product\impl\list-product.executor.ts
import { Inject, Provide } from '@midwayjs/decorator';
import {
  QueryBase,
  QueryExecutorBase,
} from '../../../../infrastructure/core/application/query';
import { MongoDbContext } from '../../../../infrastructure/db/mongodb/db-context';
import { SubscribeQuery } from '../../../../infrastructure/decorator/query';
import { ListProductQuery } from '../../../query/product/impl/list-product.query';
import { IListProductExecutor } from '../interface';

@SubscribeQuery(ListProductQuery)
@Provide() //添加到IoC容器 必填
export class ListProductExecutor
  extends QueryExecutorBase
  implements IListProductExecutor {
  @Inject('mongoDbContext') //从IoC获取实例 必填
  dbContext: MongoDbContext;
  async executeQuery<Q extends QueryBase>(query: Q): Promise<any> {
    if (query instanceof ListProductQuery) {
      this.dbContext.switchDatabase('admin'); //切换数据库
      const products = this.dbContext.list(
        'product', //模型名称
        {
          //筛选条件
          productName: new RegExp(query.productName),
        },
        null, //字段过滤
        {
          //执行参数
          skip: (query.page - 1) * query.limit,
          limit: query.limit,
        }
      );
      return products;
    }
    throw new Error('未识别的指令');
  }
}
