import { Schema } from 'mongoose';

export const CategorySchema = new Schema({
  name: { type: String, required: true },
});
