import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from '../category/entities/category.entity';
import { Product } from './entities/product.entity';
import { verify } from 'jsonwebtoken';
const mongoose = require('mongoose');
require('dotenv').config();

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async create(category: String, product: Product, token: String) {
    const [, jwt] = token.split(' ');
    const userid = verify(jwt, process.env.secretkey);
    if (userid.sub == process.env.masteraccount) {
      const thiscategory = await this.categoryModel.findOne({ name: category });
      if (!thiscategory) {
        return { error: "Can't find a category to create Product" };
      }
      product.category_id = thiscategory._id;
      return await this.productModel.create(product);
    }
    throw new HttpException('NOT AUTORIZED', HttpStatus.FORBIDDEN);
  }

  async update(product_id: String, product: Product, token: String) {
    const [, jwt] = token.split(' ');
    const userid = verify(jwt, process.env.secretkey);
    if (userid.sub == process.env.masteraccount) {
      const productupdated = await this.productModel.findByIdAndUpdate(
        product_id,
        product,
      );
      if (!productupdated) {
        return { error: "This product don't exist." };
      }
      return { message: 'Product updated.' };
    }
    throw new HttpException('NOT AUTORIZED', HttpStatus.FORBIDDEN);
  }

  async delete(product_id: String, token: String) {
    const [, jwt] = token.split(' ');
    const userid = verify(jwt, process.env.secretkey);
    if (userid.sub == process.env.masteraccount) {
      const deletedProduct = await this.productModel.findByIdAndDelete(
        product_id,
      );
      if (!deletedProduct) {
        return { error: "This product don't exist" };
      }
      return { message: `${Product.name} deleted.` };
    }
    throw new HttpException('NOT AUTORIZED', HttpStatus.FORBIDDEN);
  }
}
