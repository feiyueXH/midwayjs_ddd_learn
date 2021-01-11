import { Provide } from '@midwayjs/decorator';
import { Product } from '../../domain/product/aggregate/product';
import { IProductRepository } from '../../domain/product/repository/product';
import { UUID } from '../util/uuid';
@Provide()
export class ProductRepository implements IProductRepository {
  save(product: Product): void {
    throw new Error('Method not implemented.');
  }
  delete(id: UUID): void {
    throw new Error('Method not implemented.');
  }
  getById(id: any): Product {
    throw new Error('Method not implemented.');
  }
}
