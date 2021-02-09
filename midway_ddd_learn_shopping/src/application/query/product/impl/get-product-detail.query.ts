import { QueryBase } from '../../../../infrastructure/core/application/query';
import { IGetProductDetailQuery } from './interface';

export class GetProductDetailQuery
  extends QueryBase
  implements IGetProductDetailQuery {
  constructor(productId: string) {
    super();
    this.productId = productId;
  }
  productId: string;
}
