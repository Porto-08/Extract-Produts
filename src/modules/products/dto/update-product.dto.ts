import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateProductDto {
  @IsNumber()
  @IsOptional()
  code: number;

  @IsString()
  status: string;

  @IsString()
  imported_t: Date;

  @IsString()
  url: string;

  @IsString()
  creator: string;

  @IsNumber()
  created_t: number;

  @IsNumber()
  last_modified_t: number;

  @IsString()
  product_name: string;

  @IsString()
  quantity: string;

  @IsString()
  brands: string;

  @IsString()
  categories: string;

  @IsString()
  labels: string;

  @IsString()
  cities: string;

  @IsString()
  purchase_places: string;

  @IsString()
  stores: string;

  @IsString()
  ingredients_text: string;

  @IsString()
  traces: string;

  @IsString()
  serving_size: string;

  @IsNumber()
  serving_quantity: number;

  @IsNumber()
  nutriscore_score: number;

  @IsString()
  nutriscore_grade: string;

  @IsString()
  main_category: string;

  @IsString()
  image_url: string;
}
