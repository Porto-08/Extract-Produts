import { FindProductsUseCase } from '../uses-cases/find-products.usecase';
import { Controller, Get, Put, Param, Body } from '@nestjs/common';
import { Product } from '../entities/product';

@Controller('products')
export class ProductController {
  constructor(private readonly findProductsUseCase: FindProductsUseCase) {}

  @Get('')
  async index(): Promise<Product[]> {
    const products = await this.findProductsUseCase.execute();

    return products;
  }

  // @Put(':id')
  // async update(
  //   @Param('id') id: string,
  //   @Body() product: Product,
  // ): Promise<Product> {
  //   const productUpdated = await this.updateProductUseCase.execute(
  //     Number(id),
  //     product,
  //   );

  //   return productUpdated;
  // }
}
