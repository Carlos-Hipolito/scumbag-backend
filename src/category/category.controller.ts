import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';

@Controller('api/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() category: Category, @Req() req: Request) {
    return this.categoryService.create(category, req.headers.authorization);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':category')
  findProducts(@Param('category') category: String) {
    return this.categoryService.findProducts(category);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':category_id')
  update(
    @Param('category_id') category_id: String,
    @Body() category: Category,
    @Req() req: Request,
  ) {
    return this.categoryService.update(
      category_id,
      category,
      req.headers.authorization,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param('id') category_id: String, @Req() req: Request) {
    return this.categoryService.delete(category_id, req.headers.authorization);
  }
}
