import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { verify } from 'jsonwebtoken';
const bcrypt = require('bcryptjs');
require('dotenv').config();

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findOne(token: string) {
    const [, jwt] = token.split(' ');
    const userid = verify(jwt, process.env.secretkey);
    const user = await this.userModel.findById(userid.sub, '-password');
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NO_CONTENT);
    }
    return user;
  }

  async create(user: User) {
    const existentUser = await this.userModel.findOne({ email: user.email });
    if (existentUser != null) {
      throw new HttpException(
        'There is an account with this email',
        HttpStatus.CONFLICT,
      );
    }
    user.password = await bcrypt.hash(user.password, 8);
    await this.userModel.create(user);
    return { message: 'user created' };
  }

  async update(user: User, token: string) {
    const [, jwt] = token.split(' ');
    const userid = verify(jwt, process.env.secretkey);
    user.password = await bcrypt.hash(user.password, 8);
    await this.userModel.findByIdAndUpdate(userid.sub, user);
    return { message: `User ${userid.sub} updated.` };
  }

  async remove(token: string) {
    const [, jwt] = token.split(' ');
    const userid = verify(jwt, process.env.secretkey);
    await this.userModel.findByIdAndDelete(userid.sub);
    return { message: `User ${userid.sub} deleted.` };
  }

  async givePoint(user_id, token: string) {
    const [, jwt] = token.split(' ');
    const userid = verify(jwt, process.env.secretkey);
    if (userid.sub == process.env.masteraccount) {
      var UserPoints = (await this.userModel.findById(user_id.id)).points;
      const newPoint = UserPoints + 1;
      const updateduser = await this.userModel.findByIdAndUpdate(user_id.id, {
        points: newPoint,
      });
      return { message: `1 point added to ${updateduser.firstname}` };
    }
    throw new HttpException('NOT_AUTORIZED', HttpStatus.FORBIDDEN);
  }
}
