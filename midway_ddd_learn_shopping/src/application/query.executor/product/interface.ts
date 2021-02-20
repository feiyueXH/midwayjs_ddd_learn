import { IQueryExecutorBase } from '../../../infrastructure/core/application/query';
import { MongoDbContext } from '../../../infrastructure/db/mongodb/db-context';

export interface IGetProductDetailExecutor extends IQueryExecutorBase {
  dbContext: MongoDbContext;
}

export interface IListProductExecutor extends IQueryExecutorBase {
  dbContext: MongoDbContext;
}
