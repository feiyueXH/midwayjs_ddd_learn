import { QueryBase } from '../../../../infrastructure/core/application/query';
import { IListProductQuery } from '../interface';

export class ListProductQuery extends QueryBase implements IListProductQuery {
  productName: string;
  page: number;
  limit: number;

  constructor(productName: string, page: number, limit: number) {
    super();
    this.setProductName(productName);
    this.setPage(page);
    this.setLimit(limit);
  }

  setProductName(productName: string): void {
    this.productName = productName;
  }

  setPage(page: number): void {
    if (page <= 0) {
      throw new Error('页数不能小于等于0');
    }
    this.page = page;
  }

  setLimit(limit: number): void {
    if (limit <= 0) {
      throw new Error('page不能小于等于0');
    }

    if (limit > 200) {
      throw new Error('limit数值太大');
    }
    this.limit = limit;
  }
}
