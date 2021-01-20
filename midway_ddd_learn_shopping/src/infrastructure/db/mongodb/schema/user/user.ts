import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  userId: String,
  userName: String,
  passWord: String,
});
