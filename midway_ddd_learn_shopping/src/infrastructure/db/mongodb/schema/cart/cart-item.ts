import { Schema } from 'mongoose';

const CartItemSchema = new Schema({
  productId: String,
  cartId: String,
  price: Number,
  count: Number,
});

export { CartItemSchema };
