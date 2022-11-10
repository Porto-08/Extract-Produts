import { Injectable } from '@nestjs/common';
import extractUrl from '../../../config/api';
import { createGunzip } from 'zlib';
import { createInterface } from 'readline';
import { createReadStream, createWriteStream, unlinkSync } from 'fs';
import { get } from 'superagent';
import { Food, FoodStatus } from '../interfaces';

@Injectable()
export class ExtractProductsUseCase {
  async execute(filename: string): Promise<any> {
    const products: Food[] = [];

    const readLineFile = (path: string) =>
      createInterface({
        input: createReadStream(path).pipe(createGunzip()),
        crlfDelay: Infinity,
      });

    return new Promise((resolve, reject) => {
      get(`https://challenges.coode.sh/food/data/json/${filename}`)
        .on('error', () => {
          reject('Error downloading file');
        })
        .pipe(createWriteStream(`./${filename}`))
        .on('finish', () => {
          readLineFile(`./${filename}`).on('line', (line) => {
            const food = JSON.parse(line) as Food;

            products.push({
              code: food.code,
              status: FoodStatus.PUBLISHED,
              imported_t: new Date(),
              url: food.url,
              creator: food.creator,
              created_t: food.created_t,
              last_modified_t: food.last_modified_t,
              product_name: food.product_name,
              quantity: food.quantity,
              brands: food.brands,
              categories: food.categories,
              labels: food.labels,
              cities: food.cities,
              purchase_places: food.purchase_places,
              stores: food.stores,
              ingredients_text: food.ingredients_text,
              traces: food.traces,
              serving_size: food.serving_size,
              serving_quantity: food.serving_quantity,
              nutriscore_score: food.nutriscore_score,
              nutriscore_grade: food.nutriscore_grade,
              main_category: food.main_category,
              image_url: food.image_url,
            });

            resolve(products);
          });
        });
    });
  }
}
