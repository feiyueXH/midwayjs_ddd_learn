import { Inject, Provide } from '@midwayjs/decorator';
import { ICartRepository } from '../../domain/cart/repository/cart';
import { Cart } from '../../domain/cart/aggregate/cart';
import { IBaseDao } from '../db/mongodb/dao/baseDao';
import { DaoFactory } from '../db/mongodb/daoFactory';
import { Converter, getProps } from '../util/converter';
import { Product } from '../../domain/cart/valueObject/product';

@Provide()
export class CartRepository implements ICartRepository {
  @Inject()
  daoFactory: DaoFactory;

  cartDao: IBaseDao;

  cartItemDao: IBaseDao;

  constructor(@Inject() daoFactory: DaoFactory) {
    //从dao工厂获取Dao
    this.cartDao = daoFactory.getDao('admin', { modelName: 'cart' });
    //从dao工厂获取Dao
    this.cartItemDao = daoFactory.getDao('admin', { modelName: 'cartItem' });
  }
  async getByBuyerId(buyerId: string): Promise<Cart> {
    const cart = await this.cartDao
      .get({ buyerId: buyerId })
      .populate('cartItems');
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
    let cart = await this.cartDao.get({ cartId: id });
    if (cart) {
      cart = await cart.populate('cartItems'); //关联查询购物车子项
      const do_cart: Cart = Converter.pojoConvertEntity(cart, Cart);
      return do_cart;
    } else {
      return null;
    }
  }

  async add(cart: Cart): Promise<boolean> {
    await this.cartDao.create(cart);
    return true;
  }

  async update(cart: Cart): Promise<boolean> {
    await this.cartDao.update(
      { cartId: cart.getCartId() },
      { lastUpdateTime: Date.now() }
    );
    await this.cartItemDao.remove({ cartId: cart.getCartId() });
    for (const item of cart.getCartItems()) {
      await this.cartItemDao.create({ ...item, cartId: cart.getCartId() });
    }
    return true;
  }

  async remove(cart: Cart): Promise<boolean> {
    await this.cartDao.remove({ cartId: cart.getCartId() });
    await this.cartItemDao.remove({ cartId: cart.getCartId() });
    return true;
  }

  async removeById(id: string): Promise<boolean> {
    await this.cartDao.remove({ cartId: id });
    await this.cartItemDao.remove({ cartId: id });

    return true;
  }
}
