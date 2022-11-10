import { describe, expect, it } from 'vitest';
import { ProductRepositoryInMemory } from '../../infra/in-memory/products-repository';

describe('Find Products', () => {
  it('should find all products', async () => {
    const productRepository = new ProductRepositoryInMemory();

    const skip = 0;
    const limit = 10;

    const products = await productRepository.find(skip, limit);

    expect(products.length).toBe(2);
  });
});
