import { FoodStatus } from 'src/modules/extract/interfaces';
import { describe, expect, it } from 'vitest';
import { ProductRepositoryInMemory } from '../../infra/in-memory/products-repository';

describe('Update Status Product', () => {
  it('should update status of a product', async () => {
    const productRepository = new ProductRepositoryInMemory();

    const code = 73490180285;

    const findProduct = await productRepository.findByCode(code);

    findProduct.status = FoodStatus.TRASH;

    const product = await productRepository.update(findProduct);

    expect(product.status).toBe(FoodStatus.TRASH);
  });

  it('should return an not found exception if dont find product', async () => {
    const productRepository = new ProductRepositoryInMemory();

    expect(async () => {
      await productRepository.findByCode(73490180287);
    }).rejects.toThrowError('Product not found');
  });
});
