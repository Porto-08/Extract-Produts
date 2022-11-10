import { ApiProperty } from '@nestjs/swagger';

export class Product {
  @ApiProperty()
  code: number;

  @ApiProperty()
  status: string;

  @ApiProperty()
  imported_t: Date;

  @ApiProperty()
  url: string;

  @ApiProperty()
  creator: string;

  @ApiProperty()
  created_t: number;

  @ApiProperty()
  last_modified_t: number;

  @ApiProperty()
  product_name: string;

  @ApiProperty()
  quantity: string;

  @ApiProperty()
  brands: string;

  @ApiProperty()
  categories: string;

  @ApiProperty()
  labels: string;

  @ApiProperty()
  cities: string;

  @ApiProperty()
  purchase_places: string;

  @ApiProperty()
  stores: string;

  @ApiProperty()
  ingredients_text: string;

  @ApiProperty()
  traces: string;

  @ApiProperty()
  serving_size: string;

  @ApiProperty()
  serving_quantity: number;

  @ApiProperty()
  nutriscore_score: number;

  @ApiProperty()
  nutriscore_grade: string;

  @ApiProperty()
  main_category: string;

  @ApiProperty()
  image_url: string;
}
