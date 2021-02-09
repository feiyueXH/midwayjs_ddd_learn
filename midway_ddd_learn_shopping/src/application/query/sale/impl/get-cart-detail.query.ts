import { QueryBase } from '../../../../infrastructure/core/application/query';
import { IGetCartDetailQuery } from '../interface';

export class GetCartDetailQuery
  extends QueryBase
  implements IGetCartDetailQuery {
  userId: string;
  constructor(userId: string) {
    super();
    this.userId = userId;
  }
}
