import { Inject, Provide } from '@midwayjs/decorator';
import { IProductRepository } from '../../domain/product/repository/product';
import { Product } from '../../domain/product/aggregate/product';
import { IBaseDao } from '../db/mongodb/dao/baseDao';
import { DaoFactory } from '../db/mongodb/daoFactory';
import { Converter } from '../util/converter';

@Provide()
export class ProductRepository implements IProductRepository {
  @Inject()
  daoFactory: DaoFactory;

  productDao: IBaseDao;

  constructor(@Inject() daoFactory: DaoFactory) {
    //从dao工厂获取Dao
    this.productDao = daoFactory.getDao('admin', { modelName: 'product' });
  }
  async update(product: Product): Promise<boolean> {
    await this.productDao.update(
      {
        productId: product.getProductId(),
      },
      product
    );
    return true;
  }
  async removeById(id: string): Promise<boolean> {
    await this.productDao.remove({ productId: id });
    return true;
  }

  async getById(id: string): Promise<Product> {
    const result = await this.productDao.get({ productId: id });
    if (result) {
      return Converter.pojoConvertEntity(result, Product);
    } else {
      return null;
    }
  }

  async add(product: Product): Promise<boolean> {
    console.log(product);
    await this.productDao.create(product);
    return true;
  }

  async remove(product: Product): Promise<boolean> {
    await this.productDao.remove({ productId: product.getProductId() });
    return true;
  }
}
