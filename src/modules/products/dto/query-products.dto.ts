import { IsOptional, IsString } from 'class-validator';

export class QueryProductDto {
  @IsOptional()
  @IsString()
  page: string;

  @IsOptional()
  @IsString()
  limit: string;
}
