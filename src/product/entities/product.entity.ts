import mongoose from 'mongoose';

export class Product {
  category_id: mongoose.Types.ObjectId;
  name: String;
  duration: Number;
  price: Number;
}
