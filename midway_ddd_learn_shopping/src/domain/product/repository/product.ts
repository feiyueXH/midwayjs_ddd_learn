import { UUID } from '../../../infrastructure/util/uuid';
import { Product } from '../aggregate/product';

export interface IProductRepository {
  save(product: Product): void;
  delete(id: UUID): void;
  getById(id: any): Product;
}
