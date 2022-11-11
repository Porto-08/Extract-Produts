import 'dotenv/config';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ProductRepositoryInMemory } from '../../infra/in-memory/products-repository';
import { ProductModule } from '../../product.module';
import { UpdateProductUseCase } from '../update-product.usecase';

describe('Update Product', () => {
  let app: INestApplication;
  let updateProductUseCase: UpdateProductUseCase;
  jest.setTimeout(10000);

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ProductModule],
    })
      .overrideProvider(UpdateProductUseCase)
      .useValue(updateProductUseCase)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

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
    }).rejects.toThrowError('Produto não encontrado');
  });

  it('/products/:code (PUT)', async () => {
    const code = 73490180286;

    const response = await request(app.getHttpServer())
      .put(`/products/${code}`)
      .send({
        cities: 'São Paulo',
      })
      .expect(200);

    expect(response.body.cities).toBe('São Paulo');
  });

  afterAll(async () => {
    await app.close();
  });
});
