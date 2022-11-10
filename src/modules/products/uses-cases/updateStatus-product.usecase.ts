import { IProductsRepository } from '../domain/repositories/products-repository';
import { Injectable, Inject } from '@nestjs/common';
import { ProductRepository } from '../infra/mongoose/products-repository';
import { FoodStatus } from 'src/modules/extract/interfaces';
import { Product } from '../entities/product';
import { BadRequestException, NotFoundException } from '@nestjs/common';

@Injectable()
export class UpdateStatusProductUseCase {
  constructor(
    @Inject(ProductRepository)
    private readonly productsRepository: IProductsRepository,
  ) {}

  async execute(code: number): Promise<Product> {
    const product = await this.productsRepository.findByCode(code);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (product.status === FoodStatus.TRASH) {
      throw new BadRequestException('Product already trashed');
    }

    product.status = FoodStatus.TRASH;

    await this.productsRepository.update(product);

    return product;
  }
}
