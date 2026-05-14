import { Router } from 'express';
import JournalEntry from '../models/JournalEntry.js';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const docs = await JournalEntry.find().sort({ publishedAt: -1 });
    res.json(docs);
  } catch (err) { next(err); }
});

router.get('/:slug', async (req, res, next) => {
  try {
    const doc = await JournalEntry.findOne({ slug: req.params.slug });
    if (!doc) return res.status(404).json({ error: 'Not found' });
    res.json(doc);
  } catch (err) { next(err); }
});

export default router;
