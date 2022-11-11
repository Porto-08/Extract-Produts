import { IProductsRepository } from '../../domain/repositories/products-repository';
import { Product } from '../../entities/product';
import { Injectable } from '@nestjs/common';
import db from '../../../../shared/config/database/mongoose';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class ProductRepository implements IProductsRepository {
  async update(product: Product): Promise<Product> {
    const productUpdated = await db
      .collection<Product>('Product')
      .findOneAndUpdate({ code: product.code }, { $set: product });

    return productUpdated as unknown as Product;
  }

  async find(skip: number, limit: number): Promise<Product[]> {
    const products = await db
      .collection<Product>('Product')
      .find()
      .skip(skip)
      .limit(limit)
      .toArray();

    return products;
  }

  async findByCode(code: number): Promise<Product> {
    const product = await db.collection<Product>('Product').findOne({ code });

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    return product as Product;
  }

  async count(): Promise<number> {
    const count = await db.collection<Product>('Product').countDocuments();

    return count;
  }
}
