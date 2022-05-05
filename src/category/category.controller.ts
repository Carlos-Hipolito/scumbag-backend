import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() category: Category) {
    return this.categoryService.create(category);
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
  ) {
    return this.categoryService.update(category_id, category);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param('id') category_id: String) {
    return this.categoryService.delete(category_id);
  }
}
