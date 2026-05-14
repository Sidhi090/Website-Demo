import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import productsRouter from './routes/products.js';
import journalRouter from './routes/journal.js';
import newsletterRouter from './routes/newsletter.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const {
  PORT = 5000,
  MONGO_URI = 'mongodb://127.0.0.1:27017/asa',
  NODE_ENV = 'development',
  CLIENT_ORIGIN = 'http://localhost:5173',
} = process.env;

const app = express();

app.use(express.json({ limit: '32kb' }));
app.use(morgan(NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(cors({ origin: CLIENT_ORIGIN, credentials: false }));

// API
app.use('/api/products',   productsRouter);
app.use('/api/journal',    journalRouter);
app.use('/api/newsletter', newsletterRouter);

app.get('/api/health', (_req, res) => res.json({ ok: true, ts: Date.now() }));

// In production, serve the built client
if (NODE_ENV === 'production') {
  const dist = path.resolve(__dirname, '../client/dist');
  app.use(express.static(dist));
  app.get('*', (_req, res) => res.sendFile(path.join(dist, 'index.html')));
}

// Error handler
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log(`✔ Mongo connected: ${MONGO_URI}`);
    app.listen(PORT, () => console.log(`✔ API on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('✗ Mongo connection failed:', err.message);
    process.exit(1);
  });
