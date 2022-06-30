import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './entities/task.entity';
import { Model } from 'mongoose';
import { verify } from 'jsonwebtoken';
import { range } from 'rxjs';
import { Product } from 'src/product/entities/product.entity';
const mongoose = require('mongoose');
require('dotenv').config();

@Injectable()
export class TaskService {
  constructor(
    @InjectModel('Task') private readonly taskModel: Model<Task>,
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async create(token: string, task: Task) {
    const [, jwt] = token.split(' ');
    const userid = verify(jwt, process.env.secretkey);
    (task.price = 0), (task.duration = 0);
    for (let i = 0; i < task.products.length; i += 1) {
      const product = await this.productModel.findById(task.products[i]);
      task.price += product.price;
    }
    for (let i = 0; i < task.products.length; i++) {
      task.duration += (
        await this.productModel.findById(task.products[i])
      ).duration;
    }
    task.user_id = mongoose.Types.ObjectId(userid.sub);
    return await this.taskModel.create(task);
  }

  async findAll() {
    return await this.taskModel.find();
  }

  async delete(token: String, task_id: String) {
    const [, jwt] = token.split(' ');
    const userid = verify(jwt, process.env.secretkey);
    const thisTask = await this.taskModel.findById(task_id);
    if (
      thisTask.user_id == userid.sub ||
      userid.sub == process.env.masteraccount
    ) {
      return await this.taskModel.findByIdAndDelete(task_id);
    }
  }

  async findOne(token: string, task_id: string) {
    const [, jwt] = token.split(' ');
    const userid = verify(jwt, process.env.secretkey);
    const thisTask = await this.taskModel.findById(task_id);
    if (
      thisTask.user_id == userid.sub ||
      userid.sub == process.env.masteraccount
    ) {
      return thisTask;
    }
    throw new HttpException('NOT AUTORIZED', HttpStatus.FORBIDDEN);
  }

  async update(token: string, task_id: string, task: Task) {
    const [, jwt] = token.split(' ');
    const userid = verify(jwt, process.env.secretkey);
    const thisTask = await this.taskModel.findById(task_id);
    if (
      thisTask.user_id == userid.sub ||
      userid.sub == process.env.masteraccount
    ) {
      await this.taskModel.findByIdAndUpdate(task_id, task);
      return task;
    }
    throw new HttpException('NOT AUTORIZED', HttpStatus.FORBIDDEN);
  }
}
