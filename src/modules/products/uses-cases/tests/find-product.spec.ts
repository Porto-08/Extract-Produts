import { describe, expect, it } from 'vitest';
import { ProductRepositoryInMemory } from '../../infra/in-memory/products-repository';

describe('Find Product', () => {
  it('should find a product by code', async () => {
    const productRepository = new ProductRepositoryInMemory();

    const code = 73490180285;

    const product = await productRepository.findByCode(73490180285);

    expect(product.code).toBe(code);
  });

  it('should return an not found exception if dont find product', async () => {
    const productRepository = new ProductRepositoryInMemory();

    expect(async () => {
      await productRepository.findByCode(73490180287);
    }).rejects.toThrowError('Product not found');
  });
});
