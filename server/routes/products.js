import { Router } from 'express';
import Product from '../models/Product.js';

const router = Router();

// GET /api/products?collection=noir|blanc&category=tops
router.get('/', async (req, res, next) => {
  try {
    const q = {};
    if (req.query.collection) q.collection = req.query.collection;
    if (req.query.category)   q.category   = req.query.category;
    const docs = await Product.find(q).sort({ order: 1, createdAt: -1 });
    res.json(docs);
  } catch (err) { next(err); }
});

router.get('/:slug', async (req, res, next) => {
  try {
    const doc = await Product.findOne({ slug: req.params.slug });
    if (!doc) return res.status(404).json({ error: 'Not found' });
    res.json(doc);
  } catch (err) { next(err); }
});

export default router;
