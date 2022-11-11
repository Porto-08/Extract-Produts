import mongoose from 'mongoose';
import db from '../../../shared/config/database/mongoose';

const ExtractionHistory = new mongoose.Schema({
  lastExtraction: Date,
  quantityProductsExtracted: Number,
});

export default db.model('ExtractionHistory', ExtractionHistory);
