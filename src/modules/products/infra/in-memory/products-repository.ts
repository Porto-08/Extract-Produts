import { IProductsRepository } from '../../domain/repositories/products-repository';
import { Product } from '../../entities/product';
import { NotFoundException } from '@nestjs/common';

export class ProductRepositoryInMemory implements IProductsRepository {
  private products: Product[] = [
    {
      code: 73490180285,
      status: 'published',
      imported_t: new Date(),
      url: 'http://world-en.openfoodfacts.org/product/0000000000017/vitoria-crackers',
      creator: 'kiliweb',
      created_t: 1529059080,
      last_modified_t: 1561463718,
      product_name: 'Vitória crackers',
      quantity: '',
      brands: '',
      categories: '',
      labels: '',
      cities: '',
      purchase_places: '',
      stores: '',
      ingredients_text: '',
      traces: '',
      serving_size: '',
      serving_quantity: 0,
      nutriscore_score: 0,
      nutriscore_grade: '',
      main_category: '',
      image_url:
        'https://static.openfoodfacts.org/images/products/000/000/000/0017/front_fr.4.400.jpg',
    },
    {
      code: 73490180286,
      status: 'published',
      imported_t: new Date(),
      url: 'http://world-en.openfoodfacts.org/product/0000000000031/cacao',
      creator: 'isagoofy',
      created_t: 1539464774,
      last_modified_t: 1539464817,
      product_name: 'Cacao',
      quantity: '130 g',
      brands: '',
      categories: '',
      labels: '',
      cities: '',
      purchase_places: '',
      stores: '',
      ingredients_text: '',
      traces: '',
      serving_size: '',
      serving_quantity: 0,
      nutriscore_score: 0,
      nutriscore_grade: '',
      main_category: '',
      image_url:
        'https://static.openfoodfacts.org/images/products/000/000/000/0031/front_fr.3.400.jpg',
    },
  ];

  async update(product: Product): Promise<Product> {
    const index = this.products.findIndex((p) => p.code === product.code);

    this.products[index] = product;

    return product;
  }

  async find(skip: number, limit: number): Promise<Product[]> {
    const products = this.products.slice(skip, limit);

    return products;
  }

  async findByCode(code: number): Promise<Product> {
    const product = this.products.find((p) => p.code === code);

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    return product;
  }

  async count(): Promise<number> {
    const count = this.products.length;

    return count;
  }
}
