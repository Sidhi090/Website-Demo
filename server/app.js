import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { connectDb } from './db.js';
import productsRouter from './routes/products.js';
import journalRouter from './routes/journal.js';
import newsletterRouter from './routes/newsletter.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const {
  NODE_ENV = 'development',
  CLIENT_ORIGIN = 'http://localhost:5173',
} = process.env;

const app = express();

app.use(express.json({ limit: '32kb' }));
app.use(morgan(NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(cors({ origin: CLIENT_ORIGIN, credentials: false }));

app.use('/api', async (_req, _res, next) => {
  try {
    await connectDb();
    next();
  } catch (err) {
    next(err);
  }
});

app.use('/api/products', productsRouter);
app.use('/api/journal', journalRouter);
app.use('/api/newsletter', newsletterRouter);

app.get('/api/health', (_req, res) => res.json({ ok: true, ts: Date.now() }));

if (NODE_ENV === 'production' && !process.env.VERCEL) {
  const dist = path.resolve(__dirname, '../client/dist');
  app.use(express.static(dist));
  app.get('*', (_req, res) => res.sendFile(path.join(dist, 'index.html')));
}

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});

export default app;
