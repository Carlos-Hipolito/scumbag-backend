import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Task } from './entities/task.entity';
import { User } from 'src/user/entities/user.entity';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() task: Task, @Req() req: Request) {
    return this.taskService.create(req.headers.authorization, task);
  }

  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Req() req: Request, @Param('id') task_id: String) {
    return this.taskService.delete(req.headers.authorization, task_id);
  }
}
