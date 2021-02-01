import { Product } from '../model/product/product';

export interface IProductRepository {
  getById(id: string): Promise<Product>;
  save(product: Product): Promise<boolean>;
  remove(product: Product): Promise<boolean>;
  removeById(id: string): Promise<boolean>;
}
