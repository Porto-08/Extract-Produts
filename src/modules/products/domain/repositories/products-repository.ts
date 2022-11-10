import { Product } from '../../entities/product';

export interface IProductsRepository {
  update(product: Product): Promise<Product>;
  find(skip: number, limit: number): Promise<Product[]>;
  findByCode(code: number): Promise<Product>;
  count(): Promise<number>;
}
