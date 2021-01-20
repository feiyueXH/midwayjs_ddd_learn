import { DTO } from '../core/base';

export class QueryCartDTO extends DTO {
  buyerId: string;
}

export class SaveCartItemDTO extends DTO {
  productId: string;

  count: number;
}

export class RemoveCartItemDTO extends DTO {
  productId: string;
  userId: string;
}
