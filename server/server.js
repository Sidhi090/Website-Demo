import 'dotenv/config';
import app from './app.js';
import { connectDb, MONGO_URI } from './db.js';

const { PORT = 5000 } = process.env;

connectDb()
  .then(() => {
    console.log(`Mongo connected: ${MONGO_URI}`);
    app.listen(PORT, () => console.log(`API on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('Mongo connection failed:', err.message);
    process.exit(1);
  });
