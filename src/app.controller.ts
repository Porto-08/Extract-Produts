import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Status da API' })
  @ApiResponse({ status: 200, description: 'Status da API' })
  health(): string {
    return this.appService.healthCheck();
  }
}
