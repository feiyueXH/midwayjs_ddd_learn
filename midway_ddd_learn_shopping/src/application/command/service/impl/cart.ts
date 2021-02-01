import { Inject, Provide } from '@midwayjs/decorator';
import { Cart } from '../../../../domain/sale/model/cart/cart';
import { ICartRepository } from '../../../../domain/sale/repository/cart';
import { Product as VProduct } from '../../../../domain/sale/model/cart/valueObject/product';
import { Product as AProduct } from '../../../../domain/product/model/product/product';
import { IProductRepository } from '../../../../domain/product/repository/product';
import { AppService } from '../../../../infrastructure/core/ddd/appService';
import { SaveCartItemDTO } from '../../../../infrastructure/dto/cart';
import {
  BasicException,
  BasicExceptionCode,
} from '../../../../infrastructure/http/exception/basic';
import { Converter } from '../../../../infrastructure/util/converter';
import { UUID } from '../../../../infrastructure/util/uuid';
import { ICartCommandService } from '../cart';

@Provide()
export class CartCommandService
  extends AppService
  implements ICartCommandService {
  @Inject()
  cartRepository: ICartRepository;

  @Inject()
  productRepository: IProductRepository;

  constructor() {
    super();
  }

  async addCartItem(buyerId: string, dto: SaveCartItemDTO): Promise<void> {
    let cart: Cart = await this.cartRepository.getByBuyerId(buyerId);
    if (!cart) {
      cart = new Cart(UUID.randomUUID(), buyerId);
    }

    const product: AProduct = await this.productRepository.getById(
      dto.productId
    );
    if (!product) {
      throw new BasicException(
        BasicExceptionCode.DB_FAIL_FIND,
        '不存在该商品!'
      );
    }

    cart.addCartItem(
      Converter.entityConvertEntity(product, VProduct),
      dto.count
    );
    await this.cartRepository.save(cart);
  }
  async removeCartItem(buyerId: string, productId: string): Promise<void> {
    const cart: Cart = await this.cartRepository.getByBuyerId(buyerId);
    if (!cart) {
      throw new BasicException(
        BasicExceptionCode.DB_FAIL_FIND,
        '查询不到购物车!'
      );
    }

    console.log(`>>>>>>>>>productId:${productId}`);
    if (!cart.existCartItem(productId)) {
      throw new BasicException(
        BasicExceptionCode.DB_FAIL_FIND,
        '购物车不存在该商品!'
      );
    }

    cart.removeCartItem(productId);
    await this.cartRepository.save(cart);
  }
}
