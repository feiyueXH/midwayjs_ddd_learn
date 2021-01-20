import { Schema } from 'mongoose';

export const ProductSchema = new Schema({
  productId: {
    type: String,
    alias: '_productId',
  },
  productName: {
    type: String,
    alias: '_productName',
  },
  price: {
    type: Number,
    alias: '_price',
  },
  stock: {
    type: Number,
    alias: '_stock',
  },
});
