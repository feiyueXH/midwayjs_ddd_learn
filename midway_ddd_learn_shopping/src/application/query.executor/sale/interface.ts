import { IQueryExecutorBase } from '../../../infrastructure/core/application/query';
import { MongoDbContext } from '../../../infrastructure/db/mongodb/db-context';

export interface IGetCartDetailExecutor extends IQueryExecutorBase {
  dbContext: MongoDbContext;
}
