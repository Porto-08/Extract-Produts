import { FindProductsUseCase } from '../uses-cases/find-products.usecase';
import {
  Controller,
  Get,
  Put,
  Param,
  Body,
  Delete,
  Query,
} from '@nestjs/common';
import { Product } from '../entities/product';
import { FindProductUseCase } from '../uses-cases/find-product.usecase';
import { UpdateStatusProductUseCase } from '../uses-cases/updateStatus-product.usecase';
import { FoodStatus } from 'src/modules/extract/interfaces';
import { UpdateProductUseCase } from '../uses-cases/update-product.usecase';
import { IPaginateProduct } from '../interfaces';

@Controller('products')
export class ProductController {
  constructor(
    private readonly findProductsUseCase: FindProductsUseCase,
    private readonly findProductUseCase: FindProductUseCase,
    private readonly updateStatusProductUseCase: UpdateStatusProductUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
  ) {}

  @Get('')
  async index(@Query() query: any): Promise<IPaginateProduct> {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;

    const products = await this.findProductsUseCase.execute(page, limit);

    return products;
  }

  @Get(':code')
  async show(@Param('code') code: string): Promise<Product> {
    const product = await this.findProductUseCase.execute(Number(code));

    return product;
  }

  @Delete(':code')
  async trashProduct(@Param('code') code: string): Promise<Product> {
    const productUpdated = await this.updateStatusProductUseCase.execute(
      Number(code),
    );

    return productUpdated;
  }

  @Put(':code')
  async updateProduct(
    @Param('code') code: string,
    @Body() product: Product,
  ): Promise<Product> {
    const productUpdated = await this.updateProductUseCase.execute(
      product,
      Number(code),
    );

    return productUpdated;
  }
}
