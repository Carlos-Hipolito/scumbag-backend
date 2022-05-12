import { Schema } from 'mongoose';

export const TaskSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  products: { type: [String], ref: 'Product', required: true },
  price: { type: Number, required: true },
  duration: { type: Number, required: true },
  schedule: { type: Number, required: true },
  paymentStatus: { type: Boolean, default: false },
  paymentMethod: { type: String, default: 'Not Paid' },
  obs: { type: String, required: false },
});
