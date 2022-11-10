import { Product } from '../entities/product';

export interface IPaginateProduct {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}
