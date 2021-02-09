import { Init, Inject, Provide } from '@midwayjs/decorator';
import { IProductRepository } from '../../domain/product/repository/product';
import { Product } from '../../domain/product/model/product/product';
import { Converter } from '../common/util/converter';
import { MongoDbContext } from '../db/mongodb/db-context';

@Provide()
export class ProductRepository implements IProductRepository {
  @Inject('mongoDbContext')
  dbCtx: MongoDbContext;

  @Init()
  async initMethod(): Promise<void> {
    //切换数据库
    this.dbCtx.switchDatabase('admin');
  }

  async save(product: Product): Promise<boolean> {
    const isExist = await this.dbCtx.get('product', {
      productId: product.getProductId(),
    });
    if (isExist) {
      await this.dbCtx.update(
        'product',
        {
          productId: product.getProductId(),
        },
        product
      );
    } else {
      await this.dbCtx.save('product', product);
    }
    return true;
  }

  async removeById(id: string): Promise<boolean> {
    await this.dbCtx.remove('product', { productId: id });
    return true;
  }

  async getById(id: string): Promise<Product> {
    const result = await this.dbCtx.get('product', { productId: id });
    if (result) {
      return Converter.pojoConvertEntity(result, Product);
    } else {
      return null;
    }
  }

  async remove(product: Product): Promise<boolean> {
    await this.dbCtx.remove('product', { productId: product.getProductId() });
    return true;
  }
}
