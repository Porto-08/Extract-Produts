import { IProductsRepository } from '../../domain/repositories/products-repository';
import { Product } from '../../entities/product';
import { Injectable } from '@nestjs/common';
import db from 'src/config/database/mongoose';

@Injectable()
export class ProductRepository implements IProductsRepository {
  async update(product: Product): Promise<Product> {
    await db
      .collection<Product>('Product')
      .updateOne({ code: product.code }, { $set: product });

    return product;
  }

  async find(): Promise<Product[]> {
    const products = await db.collection<Product>('Product').find().toArray();

    return products;
  }

  async findByCode(code: number): Promise<Product> {
    const product = await db.collection<Product>('Product').findOne({ code });

    return product as Product;
  }
}
