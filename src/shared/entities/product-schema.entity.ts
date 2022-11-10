import mongoose from 'mongoose';
import db from 'src/config/database/mongoose';

const ProductSchema = new mongoose.Schema({
  code: Number,
  status: String,
  imported_t: Date,
  url: String,
  creator: String,
  created_t: Number,
  last_modified_t: Number,
  product_name: String,
  quantity: String,
  brands: String,
  categories: String,
  labels: String,
  cities: String,
  purchase_places: String,
  stores: String,
  ingredients_text: String,
  traces: String,
  serving_size: String,
  serving_quantity: Number,
  nutriscore_score: Number,
  nutriscore_grade: String,
  main_category: String,
  image_url: String,
});

export default db.model('Product', ProductSchema);
