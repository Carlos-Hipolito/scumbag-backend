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
const mongoose = require('mongoose');

@Injectable()
export class TaskService {
  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {}

  async create(token: string, task: Task) {
    const [, jwt] = token.split(' ');
    const userid = verify(jwt, process.env.secretkey);
    task.user_id = mongoose.Types.ObjectId(userid.sub);
    return await this.taskModel.create(task);
  }
}
