import { Inject, Provide } from '@midwayjs/decorator';
import { Product } from '../../../domain/product/aggregate/product';
import { IProductRepository } from '../../../domain/product/repository/product';
import { UUID } from '../../../infrastructure/util/uuid';
import {
  SaveProductDTO,
  UpdateProductDTO,
} from '../../../infrastructure/dto/product';
import { IProductAppService } from '../product';
import { Converter } from '../../../infrastructure/util/converter';

@Provide()
export class ProductAppService implements IProductAppService {
  async getProduct(productId: string): Promise<Product> {
    return await this.productRepository.getById(productId);
  }
  @Inject()
  productRepository: IProductRepository;

  async addProduct(product: SaveProductDTO): Promise<void> {
    const _product = Converter.pojoConvertEntity(product, Product);
    _product.setProductId(UUID.randomUUID());
    await this.productRepository.add(_product);
  }
  async updateProduct(product: UpdateProductDTO): Promise<void> {
    await this.productRepository.update(
      Converter.pojoConvertEntity(product, Product)
    );
  }
  async removeProduct(productId: string): Promise<void> {
    await this.productRepository.removeById(productId);
  }
}
