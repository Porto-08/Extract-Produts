import 'dotenv/config';
import * as request from 'supertest';
import { ProductRepositoryInMemory } from '../../infra/in-memory/products-repository';
import { INestApplication } from '@nestjs/common';
import { FindProductUseCase } from '../find-product.usecase';
import { ProductModule } from '../../product.module';
import { Test } from '@nestjs/testing';

describe('Find Product', () => {
  let app: INestApplication;
  let findProductUseCase: FindProductUseCase;
  jest.setTimeout(10000);

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ProductModule],
    })
      .overrideProvider(FindProductUseCase)
      .useValue(findProductUseCase)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

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
    }).rejects.toThrowError('Produto não encontrado');
  });

  it('/products/:code (GET)', async () => {
    const code = 73490180286;

    const response = await request(app.getHttpServer())
      .get(`/products/${code}`)
      .expect(200);

    expect(response.body.code).toBe(code);
  });

  it('/products/:code (GET) - not found', async () => {
    const code = 73490180285;

    const response = await request(app.getHttpServer())
      .get(`/products/${code}`)
      .expect(404);

    expect(response.body.message).toBe('Produto não encontrado');
  });

  afterAll(async () => {
    await app.close();
  });
});
