import { Cart } from '../../../domain/cart/aggregate/cart';
import { ICartRepository } from '../../../domain/cart/repository/cart';
import { UUID } from '../../../infrastructure/util/uuid';
import { CartAppService } from '../cart';
import { Inject } from '@midwayjs/decorator';
import { IGoodsRepository } from '../../../domain/goods/repository/goods';
import { SubmitOrderService } from '../../../domain/cart/service/submitOrder';
export class CartAppServiceImpl implements CartAppService {
  @Inject()
  cartRepository: ICartRepository;

  @Inject()
  goodRepository: IGoodsRepository;

  @Inject()
  submitOrderService: SubmitOrderService;

  getCart(userId: UUID): Cart {
    let cart = this.cartRepository.getByUserId(userId);
    if (cart === null) {
      cart = new Cart(UUID.randomUUID(), userId);
      this.cartRepository.save(cart);
    }
    return cart;
  }

  addCartItem(id: UUID, goodId: UUID, num: number): void {
    const cart = this.cartRepository.getById(id);
    if (cart === null) {
      throw new Error('查无购物车');
    }
    const goods = this.goodRepository.getById(goodId);
    if (cart === null) {
      throw new Error('查无商品');
    }
    cart.addCartItem(goods, num);
    this.cartRepository.save(cart);
  }

  submitOrder(cartId: UUID, remark: string) {
    const cart = this.cartRepository.getById(cartId);
    if (cart === null) {
      throw new Error('查无购物车');
    }
    const orderForm = this.submitOrderService.submit(cart, remark);
  }
}
