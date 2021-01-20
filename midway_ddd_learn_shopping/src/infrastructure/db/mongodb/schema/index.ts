import { ProductSchema } from './product/product';
import { UserSchema } from './user/user';
import { CartSchema } from './cart/cart';
import { CartItemSchema } from './cart/cartItem';
export const schemaArray = [
  { modelName: 'user', schema: UserSchema },
  { modelName: 'product', schema: ProductSchema },
  { modelName: 'cart', schema: CartSchema },
  { modelName: 'cartItem', schema: CartItemSchema },
];
