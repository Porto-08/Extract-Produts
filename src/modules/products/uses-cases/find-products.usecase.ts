import { Injectable, Inject } from '@nestjs/common';
import { IProductsRepository } from '../domain/repositories/products-repository';
import { ProductRepository } from '../infra/mongoose/products-repository';
import { IPaginateProduct } from '../interfaces';

@Injectable()
export class FindProductsUseCase {
  constructor(
    @Inject(ProductRepository)
    private readonly productsRepository: IProductsRepository,
  ) {}

  async execute(page: number, limit: number): Promise<IPaginateProduct> {
    const skip = (page - 1) * limit;

    const products = await this.productsRepository.find(skip, limit);

    const count = await this.productsRepository.count();

    const pages = Math.ceil(count / limit);

    return {
      page,
      limit,
      pages,
      total: count,
      products,
    };
  }
}
