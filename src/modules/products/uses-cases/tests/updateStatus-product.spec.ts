import 'dotenv/config';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ProductModule } from '../../product.module';
import { FoodStatus } from '../../../extract/interfaces';
import { ProductRepositoryInMemory } from '../../infra/in-memory/products-repository';
import { UpdateStatusProductUseCase } from '../updateStatus-product.usecase';

describe('Update Status Product', () => {
  let app: INestApplication;
  let updateStatusProductUseCase: UpdateStatusProductUseCase;
  jest.setTimeout(10000);

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ProductModule],
    })
      .overrideProvider(UpdateStatusProductUseCase)
      .useValue(updateStatusProductUseCase)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });
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
    }).rejects.toThrowError('Produto não encontrado');
  });

  afterAll(async () => {
    await app.close();
  });
});
