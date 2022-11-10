import { Module } from '@nestjs/common';
import { ExtractProductsUseCase } from './use-cases/extract-products.usecase';

@Module({
  imports: [],
  controllers: [],
  providers: [ExtractProductsUseCase],
})
export class ExtractModule {}
