import { Product } from '../../entities/product';

export interface IProductsRepository {
  update(product: Product): Promise<Product>;
  find(): Promise<Product[]>;
  findByCode(code: number): Promise<Product>;
}
