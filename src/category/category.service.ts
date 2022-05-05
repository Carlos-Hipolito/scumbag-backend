import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/product/entities/product.entity';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async findAll() {
    return await this.categoryModel.find();
  }

  async create(category: Category) {
    const ExistentCategory = await this.categoryModel.findOne({
      name: category.name,
    });
    if (!ExistentCategory) {
      return await this.categoryModel.create(category);
    }
    throw new HttpException('This category already exist', HttpStatus.CONFLICT);
  }

  async findProducts(category: String) {
    const thiscategory = await this.categoryModel.findOne({ name: category });
    if (!thiscategory) {
      return { error: `There is no category named ${category}` };
    }
    const products = await this.productModel.find({
      category_id: thiscategory._id,
    });
    if (products.length == 0) {
      return { message: 'There is no product in this category' };
    }
    return products;
  }

  async update(category_id: String, category: Category) {
    const categoryupdated = await this.categoryModel.findByIdAndUpdate(
      category_id,
      category,
    );
    if (!categoryupdated) {
      return { error: "This category don't exist." };
    }
    return { message: 'Category updated.' };
  }

  async delete(category_id: String) {
    const deletedCategory = await this.categoryModel.findByIdAndDelete(
      category_id,
    );
    if (!deletedCategory) {
      return { error: "Can't find this category" };
    }
    await this.productModel.deleteMany({ category_id: deletedCategory._id });
    return { message: `Category ${deletedCategory.name} deleted ` };
  }
}
