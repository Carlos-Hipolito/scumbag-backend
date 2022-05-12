import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post(':category')
  create(
    @Param('category') category: String,
    @Body() product: Product,
    @Req() req: Request,
  ) {
    return this.productService.create(
      category,
      product,
      req.headers.authorization,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(
    @Param('id') product_id: String,
    @Body() product: Product,
    @Req() req: Request,
  ) {
    return this.productService.update(
      product_id,
      product,
      req.headers.authorization,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param('id') product_id: String, @Req() req: Request) {
    return this.productService.delete(product_id, req.headers.authorization);
  }
}
