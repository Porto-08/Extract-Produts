import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IHealthCheck } from './interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Status da API' })
  @ApiResponse({ status: 200, description: 'Status da API' })
  async health(): Promise<IHealthCheck> {
    return await this.appService.healthCheck();
  }
}
