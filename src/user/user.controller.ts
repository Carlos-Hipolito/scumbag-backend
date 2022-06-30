import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  Put,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() user: User) {
    return this.userService.create(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findOne(@Req() request: Request) {
    return this.userService.findOne(request.headers.authorization);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch()
  update(@Body() user: User, @Req() req: Request) {
    return this.userService.update(user, req.headers.authorization);
  }
  @UseGuards(AuthGuard('jwt'))
  @Delete()
  remove(@Req() req: Request) {
    return this.userService.remove(req.headers.authorization);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/givepoint/:id')
  givePoint(@Param() user_id: string, @Req() req: Request) {
    return this.userService.givePoint(user_id, req.headers.authorization);
  }
}
