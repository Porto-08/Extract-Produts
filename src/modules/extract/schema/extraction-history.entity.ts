import mongoose from 'mongoose';
import db from 'src/config/database/mongoose';

const ExtractionHistory = new mongoose.Schema({
  lastExtraction: Date,
  quantityProductsExtracted: Number,
});

export default db.model('ExtractionHistory', ExtractionHistory);
