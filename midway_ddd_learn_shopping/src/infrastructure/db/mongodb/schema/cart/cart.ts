import { Schema } from 'mongoose';

const CartSchema = new Schema({
  cartId: String,
  buyerId: String,
});

CartSchema.virtual('cartItems', {
  ref: 'cartItem',
  localField: 'cartId',
  foreignField: 'cartId',
  justOne: false,
});

export { CartSchema };
