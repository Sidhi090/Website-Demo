import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import Subscriber from '../models/Subscriber.js';

const router = Router();

// Cheap abuse guard for the newsletter endpoint
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1h
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
});

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post('/', limiter, async (req, res, next) => {
  try {
    const email = String(req.body.email || '').trim().toLowerCase();
    if (!EMAIL_RE.test(email)) {
      return res.status(400).json({ error: 'Invalid email' });
    }
    await Subscriber.updateOne(
      { email },
      { $setOnInsert: { email, source: 'website-footer' } },
      { upsert: true }
    );
    res.json({ ok: true });
  } catch (err) { next(err); }
});

export default router;
