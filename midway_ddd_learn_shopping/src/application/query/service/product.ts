import { ProductVO } from '../../../infrastructure/vo/product';

export interface IProductQueryService {
  getProduct(productId: string): Promise<ProductVO>;
}
