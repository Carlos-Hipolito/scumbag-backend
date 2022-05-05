import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema } from 'src/schemas/TaskSchema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema}])],
  controllers: [TaskController],
  providers: [TaskService]
})
export class TaskModule {}
