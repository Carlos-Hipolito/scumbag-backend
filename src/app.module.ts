import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
require('dotenv').config()
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task/task.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';

const db_password = process.env.db_password;

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb+srv://crud-cloud-teste:${db_password}@crud-cloud.usbvx.mongodb.net/scumbag?retryWrites=true&w=majority`), 
    UserModule, AuthModule, TaskModule, CategoryModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],


})
export class AppModule {}
