import { Injectable, Inject } from '@nestjs/common';
import { IProductsRepository } from '../domain/repositories/products-repository';
import { Product } from '../entities/product';
import { ProductRepository } from '../infra/mongoose/products-repository';

@Injectable()
export class FindProductUseCase {
  constructor(
    @Inject(ProductRepository)
    private readonly productsRepository: IProductsRepository,
  ) {}

  async execute(code: number): Promise<Product> {
    const product = await this.productsRepository.findByCode(code);

    return product;
  }
}
