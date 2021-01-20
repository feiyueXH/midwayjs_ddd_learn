import { Inject } from '@midwayjs/decorator';
import { Cart } from '../../../domain/cart/aggregate/cart';
import { ICartRepository } from '../../../domain/cart/repository/cart';
import { Product } from '../../../domain/product/aggregate/product';
import { IProductRepository } from '../../../domain/product/repository/product';
import { AppService } from '../../../infrastructure/core/appService';
import { SaveCartItemDTO } from '../../../infrastructure/dto/cart';
import { Converter } from '../../../infrastructure/util/converter';
import { CartVO } from '../../../infrastructure/vo/cart';
import { ICartAppService } from '../cart';

export class CartAppService extends AppService implements ICartAppService {
  @Inject()
  cartRepository: ICartRepository;

  @Inject()
  productRepository: IProductRepository;

  constructor() {
    super();
  }
  async getCartBuyerId(buyerId: string): Promise<CartVO> {
    const cart: Cart = await this.cartRepository.getByBuyerId(buyerId);
    return Converter.entityConvertPojo(cart, CartVO); //将DO转为VO
  }

  async addCartItem(buyerId: string, dto: SaveCartItemDTO): Promise<void> {
    const cart: Cart = await this.cartRepository.getByBuyerId(buyerId);
    if (!cart) {
      throw new Error('查询不到购物车!');
    }

    const product: Product = await this.productRepository.getById(
      dto.productId
    );
    if (!product) {
      throw new Error('查询不到商品!');
    }

    cart.addCartItem(product.getProductId(), product.getPrice(), dto.count);
    await this.cartRepository.update(cart);
  }
  async removeCartItem(buyerId: string, productId: string): Promise<void> {
    const cart: Cart = await this.cartRepository.getByBuyerId(buyerId);
    if (!cart) {
      throw new Error('查询不到购物车!');
    }

    if (!cart.existCartItem(productId)) {
      throw new Error('购物车不存在该商品!');
    }

    cart.removeCartItem(productId);
    await this.cartRepository.update(cart);
  }
}
