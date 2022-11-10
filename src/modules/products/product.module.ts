import { Module } from '@nestjs/common';
import { ProductController } from './controllers/product-controllers';
import { ProductRepository } from './infra/mongoose/products-repository';
import { FindProductsUseCase } from './uses-cases/find-products.usecase';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [ProductRepository, FindProductsUseCase],
})
export class ProductModule {}
