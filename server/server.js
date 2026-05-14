import 'dotenv/config';
import app from './app.js';
import { connectDb, MONGO_URI } from './db.js';

const { PORT = 5000 } = process.env;

const startServer = () => {
  app.listen(PORT, () => console.log(`API on http://localhost:${PORT}`));
};

startServer();

connectDb()
  .then(() => {
    console.log(`Mongo connected: ${MONGO_URI}`);
  })
  .catch((err) => {
    console.warn(`Mongo unavailable: ${err.message}`);
    console.warn('Starting API without database. The client will use fallback demo data.');
  });
