import { Food, FoodStatus } from '../interfaces';
import { createWriteStream } from 'fs';
import { get } from 'superagent';
import readLineFile from './readLineFile';

const extractProduts = async (url: string, filePath: string) => {
  const products: Food[] = [];

  return new Promise((resolve, reject) => {
    get(url)
      .on('error', () => {
        reject('Error downloading file');
      })
      .pipe(createWriteStream(filePath))
      .on('finish', () => {
        readLineFile(filePath).on('line', (line) => {
          const food = JSON.parse(line) as any;

          products.push({
            code: Number(food.code.trim()),
            status: FoodStatus.PUBLISHED,
            imported_t: new Date(),
            url: food.url,
            creator: food.creator,
            created_t: Number(food.created_t),
            last_modified_t: Number(food.last_modified_t),
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
            serving_quantity: Number(food.serving_quantity),
            nutriscore_score: Number(food.nutriscore_score),
            nutriscore_grade: food.nutriscore_grade,
            main_category: food.main_category,
            image_url: food.image_url,
          });

          resolve(products);
        });
      });
  });
};

export default extractProduts;
