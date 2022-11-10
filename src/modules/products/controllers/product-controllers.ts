import { FindProductsUseCase } from '../uses-cases/find-products.usecase';
import {
  Controller,
  Get,
  Put,
  Param,
  Body,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Product } from '../entities/product';
import { FindProductUseCase } from '../uses-cases/find-product.usecase';
import { UpdateStatusProductUseCase } from '../uses-cases/updateStatus-product.usecase';
import { FoodStatus } from 'src/modules/extract/interfaces';
import { UpdateProductUseCase } from '../uses-cases/update-product.usecase';
import { IPaginateProduct } from '../interfaces';
import { QueryProductDto } from '../dto/query-products.dto';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(
    private readonly findProductsUseCase: FindProductsUseCase,
    private readonly findProductUseCase: FindProductUseCase,
    private readonly updateStatusProductUseCase: UpdateStatusProductUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
  ) {}

  @Get('')
  @ApiOperation({ summary: 'Lista todos os produtos' })
  @ApiResponse({ status: 200, description: 'Lista todos os produtos' })
  async index(
    @Query() queryProductDto: QueryProductDto,
  ): Promise<IPaginateProduct> {
    const page = Number(queryProductDto.page) || 1;
    const limit = Number(queryProductDto.limit) || 10;

    const products = await this.findProductsUseCase.execute(page, limit);

    return products;
  }

  @Get(':code')
  @ApiOperation({ summary: 'Pesquisa um produto por código' })
  @ApiResponse({ status: 200, description: 'Pesquisa um produto por código' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  async show(@Param('code') code: string): Promise<Product> {
    const product = await this.findProductUseCase.execute(Number(code));

    return product;
  }

  @Delete(':code')
  @ApiOperation({ summary: 'Altera o status produto para trash por código' })
  @ApiResponse({ status: 200, description: 'Deleta um produto por código' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  async trashProduct(@Param('code') code: string): Promise<Product> {
    const productUpdated = await this.updateStatusProductUseCase.execute(
      Number(code),
    );

    return productUpdated;
  }

  @Put(':code')
  @ApiOperation({ summary: 'Atualiza um produto por código' })
  @ApiResponse({ status: 200, description: 'Atualiza um produto por código' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  async updateProduct(
    @Param('code') code: string,
    @Body() product: Product,
  ): Promise<Product> {
    const productUpdated = await this.updateProductUseCase.execute(
      product,
      Number(code),
    );

    return productUpdated;
  }
}
