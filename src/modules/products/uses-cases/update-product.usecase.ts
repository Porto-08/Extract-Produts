import { IProductsRepository } from '../domain/repositories/products-repository';
import { Injectable, Inject } from '@nestjs/common';
import { ProductRepository } from '../infra/mongoose/products-repository';
import { Product } from '../entities/product';
import { BadRequestException, NotFoundException } from '@nestjs/common';

@Injectable()
export class UpdateProductUseCase {
  constructor(
    @Inject(ProductRepository)
    private readonly productsRepository: IProductsRepository
  ) {}

  async execute(product: Product, code: number): Promise<Product> {
    const findProduct = await this.productsRepository.findByCode(code);

    if (!findProduct) {
      throw new NotFoundException('Produto não encontrado');
    }

    const productUpdated = Object.assign(findProduct, product);

    await this.productsRepository.update(productUpdated);

    return product;
  }
}
