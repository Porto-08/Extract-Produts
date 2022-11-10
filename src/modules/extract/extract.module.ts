import { Module } from '@nestjs/common';
import { ExtractController } from './controllers/extract-controller';
import { ExtractProductsUseCase } from './use-cases/extract-products.usecase';

@Module({
  imports: [],
  controllers: [ExtractController],
  providers: [ExtractProductsUseCase],
})
export class ExtractModule {}
