import { Product } from '../aggregate/product';

export interface IProductRepository {
  getById(id: string): Promise<Product>;
  add(product: Product): Promise<boolean>;
  update(product: Product): Promise<boolean>;
  remove(product: Product): Promise<boolean>;
  removeById(id: string): Promise<boolean>;
}
