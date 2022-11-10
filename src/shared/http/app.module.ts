import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExtractModule } from '../../modules/imports/extract.module';

@Module({
  imports: [ExtractModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
