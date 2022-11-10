import { describe, expect, it } from 'vitest';
import { ProductRepositoryInMemory } from '../../infra/in-memory/products-repository';

describe('Update Product', () => {
  it('should update a product', async () => {
    const productRepository = new ProductRepositoryInMemory();

    const code = 73490180285;

    const findProduct = await productRepository.findByCode(code);

    findProduct.cities = 'São Paulo';

    const product = await productRepository.update(findProduct);

    expect(product.cities).toBe('São Paulo');
  });

  it('should return an not found exception if dont find product', async () => {
    const productRepository = new ProductRepositoryInMemory();

    expect(async () => {
      await productRepository.findByCode(73490180287);
    }).rejects.toThrowError('Product not found');
  });
});
