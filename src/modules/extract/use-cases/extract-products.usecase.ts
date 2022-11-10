import { Injectable } from '@nestjs/common';
import extractProduts from '../utils/extractProduts';
import { Cron, CronExpression } from '@nestjs/schedule';
import { filesname } from '../utils/filesname';
import db from 'src/config/database/mongoose';
import { unlinkSync } from 'fs';

@Injectable()
export class ExtractProductsUseCase {
  @Cron(CronExpression.EVERY_5_MINUTES)
  async execute(): Promise<any> {
    const data: any[] = [];

    for (const file of filesname) {
      const products: any = await extractProduts(
        `${process.env.EXTRACT_URL}/${file}`,
        `./${file}`,
      );

      data.push(...products);

      unlinkSync(`./${file}`);
    }

    await db.collection('Product').insertMany(data);

    console.log('Products extracted and saved');
  }
}
