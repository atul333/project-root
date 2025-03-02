// backend/config/db.js
const mongoose = require('mongoose');
const logger = require('../utils/logger');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/telegramAds', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    logger.info('MongoDB connected successfully');
  } catch (err) {
    logger.error('MongoDB connection error: ' + err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
