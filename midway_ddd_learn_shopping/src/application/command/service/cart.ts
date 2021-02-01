import { SaveCartItemDTO } from '../../../infrastructure/dto/cart';

export interface ICartCommandService {
  addCartItem(cartId: string, dto: SaveCartItemDTO): Promise<void>;
  removeCartItem(cartId: string, productId: string): Promise<void>;
}
