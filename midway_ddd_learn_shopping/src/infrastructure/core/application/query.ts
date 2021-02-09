import { UUID } from '../../common/util/uuid';

// 查询基类
export interface IQueryBase {
  uuid: string;
}

// 查询基类
export abstract class QueryBase implements IQueryBase {
  uuid: string;
  constructor(uuid?: string) {
    this.uuid = uuid || UUID.randomUUID();
  }
}

export interface IQueryExecutorBase {
  uuid: string;

  executeQuery<Q extends QueryBase>(query: Q): Promise<any>;
}

/**
 * 查询执行者
 */
export abstract class QueryExecutorBase implements IQueryExecutorBase {
  uuid: string;
  constructor(uuid?: string) {
    this.uuid = uuid || UUID.randomUUID();
  }

  abstract executeQuery<Q extends QueryBase>(query: Q): Promise<any>;
}
