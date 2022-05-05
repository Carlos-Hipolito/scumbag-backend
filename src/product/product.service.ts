import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from 'src/category/entities/category.entity';
import { Product } from './entities/product.entity';
const mongoose = require('mongoose');

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async create(category: String, product: Product) {
    const thiscategory = await this.categoryModel.findOne({ name: category });
    if (!thiscategory) {
      return { error: "Can't find a category to create Product" };
    }
    product.category_id = thiscategory._id;
    return await this.productModel.create(product);
  }

  async update(product_id: String, product: Product) {
    const productupdated = await this.productModel.findByIdAndUpdate(
      product_id,
      product,
    );
    if (!productupdated) {
      return { error: "This product don't exist." };
    }
    return { message: 'Product updated.' };
  }
}
