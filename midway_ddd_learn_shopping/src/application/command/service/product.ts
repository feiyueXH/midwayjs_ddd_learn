import {
  SaveProductDTO,
  UpdateProductDTO,
} from '../../../infrastructure/dto/product';

export interface IProductCommandService {
  addProduct(product: SaveProductDTO): Promise<void>;
  updateProduct(product: UpdateProductDTO): Promise<void>;
  removeProduct(productId: string): Promise<void>;
}
