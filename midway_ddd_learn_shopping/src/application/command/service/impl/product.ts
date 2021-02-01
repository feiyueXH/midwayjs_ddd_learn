import { Inject, Provide } from '@midwayjs/decorator';
import { Product } from '../../../../domain/product/model/product/product';
import { IProductRepository } from '../../../../domain/product/repository/product';
import { UUID } from '../../../../infrastructure/util/uuid';
import {
  SaveProductDTO,
  UpdateProductDTO,
} from '../../../../infrastructure/dto/product';
import { IProductCommandService } from '../product';
import { Converter } from '../../../../infrastructure/util/converter';
import { Context } from 'egg';

@Provide()
export class ProductCommandService implements IProductCommandService {
  @Inject()
  ctx: Context;

  @Inject()
  productRepository: IProductRepository;

  async addProduct(product: SaveProductDTO): Promise<void> {
    const _product = Converter.pojoConvertEntity(product, Product);
    _product.setProductId(UUID.randomUUID());
    await this.productRepository.save(_product);
  }
  async updateProduct(product: UpdateProductDTO): Promise<void> {
    await this.productRepository.save(
      Converter.pojoConvertEntity(product, Product)
    );
  }
  async removeProduct(productId: string): Promise<void> {
    await this.productRepository.removeById(productId);
  }
}
