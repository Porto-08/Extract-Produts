import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExtractModule } from './modules/extract/extract.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ProductModule } from './modules/products/product.module';

@Module({
  imports: [ScheduleModule.forRoot(), ExtractModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
