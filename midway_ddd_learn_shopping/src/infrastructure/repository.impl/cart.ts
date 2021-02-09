import { Init, Inject, Provide } from '@midwayjs/decorator';
import { ICartRepository } from '../../domain/sale/repository/cart';
import { Cart } from '../../domain/sale/model/cart/cart';
import { Converter, getProps } from '../common/util/converter';
import { Product } from '../../domain/sale/model/cart/value-object/product';
import { MongoDbContext } from '../db/mongodb/db-context';

@Provide()
export class CartRepository implements ICartRepository {
  @Inject('mongoDbContext')
  dbCtx: MongoDbContext;

  @Init()
  async initMethod(): Promise<void> {
    //切换数据库
    this.dbCtx.switchDatabase('admin');
  }

  async getByBuyerId(buyerId: string): Promise<Cart> {
    //切换Model,进行关联查询
    const cart = await (await this.dbCtx.get('cart', { buyerId: buyerId }))
      .populate('cartItems')
      .execPopulate();

    console.log(cart);
    if (cart) {
      console.log(`cart:${cart}`);
      const do_cart: Cart = Converter.pojoConvertEntity(cart, Cart);
      for (const item of getProps(cart, 'cartItems')) {
        do_cart.addCartItem(
          Converter.pojoConvertEntity(item, Product),
          item.count
        );
      }
      console.log(`do_cart:${JSON.stringify(do_cart)}`);
      return do_cart;
    } else {
      return null;
    }
  }

  async getById(id: string): Promise<Cart> {
    let cart = await this.dbCtx.get('cart', { cartId: id });
    if (cart) {
      cart = cart.populate('cartItems'); //关联查询购物车子项
      const do_cart: Cart = Converter.pojoConvertEntity(cart, Cart);
      return do_cart;
    } else {
      return null;
    }
  }

  async save(cart: Cart): Promise<boolean> {
    if (await this.dbCtx.get('cart', { cartId: cart.getCartId() })) {
      await this.dbCtx.save('cart', cart);
    } else {
      await this.dbCtx.update(
        'cart',
        { cartId: cart.getCartId() },
        { lastUpdateTime: Date.now() }
      );
    }

    for (const item of cart.getCartItems()) {
      if (
        await this.dbCtx.get('cartItem', { productId: item.getProductId() })
      ) {
        await this.dbCtx.update(
          'cartItem',
          {
            productId: item.getProductId(),
          },
          {
            ...item,
            cartId: cart.getCartId(),
          }
        );
      } else {
        await this.dbCtx.save('cartItem', {
          ...item,
          cartId: cart.getCartId(),
        });
      }
    }

    return true;
  }

  async remove(cart: Cart): Promise<boolean> {
    await this.dbCtx.remove('cart', { cartId: cart.getCartId() });
    await this.dbCtx.remove('cartItem', { cartId: cart.getCartId() });
    return true;
  }

  async removeById(id: string): Promise<boolean> {
    await this.dbCtx.remove('cart', { cartId: id });
    await this.dbCtx.remove('cartItem', { cartId: id });
    return true;
  }
}
