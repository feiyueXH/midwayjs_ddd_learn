import { Rule, RuleType } from '@midwayjs/decorator';

export class SaveProductDTO {
  @Rule(RuleType.string().required())
  productName: string;

  price: number;

  stock: number;
}

export class GetProductDTO {
  @Rule(RuleType.string().required())
  productId: string;
}

export class UpdateProductDTO {
  productName: string;
  @Rule(RuleType.string().required())
  productId: string;
  price: number;
  stock: number;
}

export class RemoveProductDTO {
  @Rule(RuleType.string().required())
  productId: string;
}

export class ListProductDTO {
  productName: string;
  page: number;
  limit: number;
}
