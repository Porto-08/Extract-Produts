import { Controller, Get, Query } from '@nestjs/common';
import { ExtractProductsUseCase } from '../use-cases/extract-products.usecase';

@Controller('extract')
export class ExtractController {
  constructor(
    private readonly extractProductsUseCase: ExtractProductsUseCase,
  ) {}

  @Get('products')
  async extractProducts() {
    return this.extractProductsUseCase.execute();
  }
}
