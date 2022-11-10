import { Injectable, Inject } from '@nestjs/common';
import { IProductsRepository } from '../domain/repositories/products-repository';
import { Product } from '../entities/product';
import { ProductRepository } from '../infra/mongoose/products-repository';

@Injectable()
export class FindProductsUseCase {
  constructor(
    @Inject(ProductRepository)
    private readonly productsRepository: IProductsRepository,
  ) {}

  async execute(): Promise<Product[]> {
    const products = await this.productsRepository.find();

    return products;
  }
}
