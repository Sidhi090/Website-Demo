import mongoose from 'mongoose';

const { MONGO_URI = 'mongodb://127.0.0.1:27017/asa' } = process.env;

let connectionPromise;

export const connectDb = async () => {
  if (mongoose.connection.readyState === 1) return mongoose.connection;

  connectionPromise ||= mongoose.connect(MONGO_URI);
  await connectionPromise;
  return mongoose.connection;
};

export { MONGO_URI };
