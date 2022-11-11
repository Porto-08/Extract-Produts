import 'dotenv/config';
import * as request from 'supertest';
import { ProductRepositoryInMemory } from '../../infra/in-memory/products-repository';
import { INestApplication } from '@nestjs/common';
import { FindProductsUseCase } from '../find-products.usecase';
import { ProductModule } from '../../product.module';
import { Test } from '@nestjs/testing';

describe('Find Products', () => {
  let app: INestApplication;
  let findProductsUseCase: FindProductsUseCase;
  jest.setTimeout(10000);

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ProductModule],
    })
      .overrideProvider(FindProductsUseCase)
      .useValue(findProductsUseCase)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('should find all products', async () => {
    const productRepository = new ProductRepositoryInMemory();

    const skip = 0;
    const limit = 10;

    const products = await productRepository.find(skip, limit);

    expect(products.length).toBe(2);
  });

  afterAll(async () => {
    await app.close();
  });
});
