import { Inject } from '@midwayjs/decorator';
import {
  BasicException,
  BasicExceptionCode,
} from '../../../../infrastructure/http/exception/basic';
import { ProductRepository } from '../../../../infrastructure/repository.impl/product';
import { Converter } from '../../../../infrastructure/util/converter';
import { ProductVO } from '../../../../infrastructure/vo/product';
import { IProductQueryService } from '../product';

export class ProductQueryService implements IProductQueryService {
  @Inject()
  productRepository: ProductRepository;
  async getProduct(productId: string): Promise<ProductVO> {
    const product = await this.productRepository.getById(productId);
    if (product) {
      return Converter.pojoConvertEntity(product, ProductVO);
    } else {
      throw new BasicException(BasicExceptionCode.DB_FAIL_FIND, '查无商品');
    }
  }
}
