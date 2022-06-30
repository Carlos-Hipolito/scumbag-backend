import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  points: { type: Number, default: 0 },
});
