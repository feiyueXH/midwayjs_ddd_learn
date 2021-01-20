import { Product } from '../../domain/product/aggregate/product';
import {
  SaveProductDTO,
  UpdateProductDTO,
} from '../../infrastructure/dto/product';

export interface IProductAppService {
  getProduct(productId: string): Promise<Product>;
  addProduct(product: SaveProductDTO): Promise<void>;
  updateProduct(product: UpdateProductDTO): Promise<void>;
  removeProduct(productId: string): Promise<void>;
}
