// import { SaveProductDTO, UpdateProductDTO } from '../../dto/product';

import { IProductRepository } from '../../../domain/product/repository/product';
import { ICommandExecutorBase } from '../../../infrastructure/core/application/command';

// export interface IProductCommandService {
//   addProduct(product: SaveProductDTO): Promise<void>;
//   updateProduct(product: UpdateProductDTO): Promise<void>;
//   removeProduct(productId: string): Promise<void>;
// }

export interface IAddProductExecutor extends ICommandExecutorBase {
  productRepository: IProductRepository;
}

export interface IUpdateProductExecutor extends ICommandExecutorBase {
  productRepository: IProductRepository;
}

export interface IRemoveProductExecutor extends ICommandExecutorBase {
  productRepository: IProductRepository;
}
