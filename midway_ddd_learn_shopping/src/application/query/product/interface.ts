import { IQueryBase } from '../../../infrastructure/core/application/query';

export interface IGetProductDetailQuery {
  productId: string;
}

export interface IListProductQuery extends IQueryBase {
  productName: string;
  page: number;
  limit: number;
}
