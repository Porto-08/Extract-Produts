import { Module } from '@nestjs/common';
import { ProductController } from './controllers/product-controllers';
import { ProductRepository } from './infra/mongoose/products-repository';
import { FindProductUseCase } from './uses-cases/find-product.usecase';
import { FindProductsUseCase } from './uses-cases/find-products.usecase';
import { UpdateProductUseCase } from './uses-cases/update-product.usecase';
import { UpdateStatusProductUseCase } from './uses-cases/updateStatus-product.usecase';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [
    ProductRepository,
    FindProductsUseCase,
    FindProductUseCase,
    UpdateStatusProductUseCase,
    UpdateProductUseCase,
  ],
})
export class ProductModule {}
