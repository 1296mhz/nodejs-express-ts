import mongoose from 'mongoose';
import logger from './logger';
import dotenv from 'dotenv';
async function MongooseConnect() {
  dotenv.config();
  mongoose.connection.on('connecting', function () {
    logger.info("trying to establish a connection to mongo");
  });

  mongoose.connection.on('connected', function () {
    logger.info("mongo connection established successfully");
  });

  mongoose.connection.on('error', function (err) {
    logger.error('connection to mongo failed ' + err);
  });

  mongoose.connection.on('disconnected', function () {
    logger.info("mongo db connection closed");
  });

  return await mongoose.connect(process.env.MONGODB_URL as string);
}

export default MongooseConnect;
