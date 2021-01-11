import { UUID } from '../../../infrastructure/util/uuid';

export class GoodsInfo {
  id: UUID;
  goodsName: string;
  price: number;
  stock: number;
}
