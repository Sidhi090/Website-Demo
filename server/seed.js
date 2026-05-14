// Seed Mongo with the demo content shown on the homepage.
// Run from /mern: `npm run seed`

import 'dotenv/config';
import mongoose from 'mongoose';
import Product from './models/Product.js';
import JournalEntry from './models/JournalEntry.js';

const { MONGO_URI = 'mongodb://127.0.0.1:27017/asa' } = process.env;

const U = (id, w = 900) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;

const products = [
  { slug: 'asymmetric-wool-coat', name: 'Asymmetric Wool Coat', collection: 'noir',  category: 'outerwear',   pieceNo: 1, priceJPY: 84000, image: U('1551803091-e20673f15770'), tag: 'New',     order: 1, fabric: '100% Wool',         care: 'Dry-clean only' },
  { slug: 'linen-drape-blouse',   name: 'Linen Drape Blouse',   collection: 'blanc', category: 'tops',        pieceNo: 3, priceJPY: 28500, image: U('1572804013309-59a88b7e92f1'), tag: '',        order: 2, fabric: '100% Linen',        care: 'Cool wash, hang dry' },
  { slug: 'wide-tailored-trouser',name: 'Wide Tailored Trouser',collection: 'noir',  category: 'bottoms',     pieceNo: 7, priceJPY: 42000, image: U('1583846783214-7229a91b20ed'), tag: 'Limited', order: 3, fabric: 'Wool-linen blend',  care: 'Dry-clean only' },
  { slug: 'cotton-layered-dress', name: 'Cotton Layered Dress', collection: 'blanc', category: 'dresses',     pieceNo: 2, priceJPY: 36800, image: U('1591348278863-a8fb3887e2aa'), tag: '',        order: 4, fabric: 'Organic cotton',    care: 'Gentle wash' },
  { slug: 'silk-crepe-shirt',     name: 'Silk Crepe Shirt',     collection: 'blanc', category: 'tops',        pieceNo: 6, priceJPY: 31500, image: U('1594633312681-425c7b97ccd1'), tag: '',        order: 5, fabric: '100% Silk',         care: 'Hand wash cold' },
  { slug: 'cashmere-knit-vest',   name: 'Cashmere Knit Vest',   collection: 'noir',  category: 'tops',        pieceNo: 4, priceJPY: 56000, image: U('1496747611176-843222e1e57c'), tag: 'New',     order: 6, fabric: '100% Cashmere',     care: 'Hand wash cold' },
  { slug: 'pleated-midi-skirt',   name: 'Pleated Midi Skirt',   collection: 'noir',  category: 'bottoms',     pieceNo: 9, priceJPY: 34000, image: U('1535295972055-1c762f4483e5'), tag: '',        order: 7, fabric: 'Polyester satin',   care: 'Cool wash' },
  { slug: 'canvas-shoulder-bag',  name: 'Canvas Shoulder Bag',  collection: 'blanc', category: 'accessories', pieceNo: 5, priceJPY: 18200, image: U('1496440737103-cd596325d314'), tag: '',        order: 8, fabric: 'Heavy canvas',      care: 'Spot clean' },
];

const journal = [
  {
    slug: 'weight-of-an-unfinished-hem',
    title: 'On the weight of an unfinished hem',
    excerpt: 'A short note from the cutting floor on why we leave certain edges raw, and others sealed by hand.',
    body: '',
    category: 'Field Notes',
    image: U('1521334884684-d80222895322'),
    publishedAt: new Date('2026-05-02'),
  },
  {
    slug: 'dye-gardens-of-awa',
    title: 'Inside the dye gardens of Awa',
    excerpt: 'Three days spent with the Watanabe family, who still grow their own indigo on a mountainside in Tokushima.',
    body: '',
    category: 'Studio Visit',
    image: U('1622445275576-721325763afe'),
    publishedAt: new Date('2026-04-19'),
  },
  {
    slug: 'twelve-patterns-eight-years-apart',
    title: 'Twelve patterns, eight years apart',
    excerpt: 'Some shapes return because we forget them, some because we never quite finish thinking through them.',
    body: '',
    category: 'Process',
    image: U('1571513800374-df1bbe650e56'),
    publishedAt: new Date('2026-03-28'),
  },
];

async function run() {
  await mongoose.connect(MONGO_URI);
  console.log('connected →', MONGO_URI);

  await Product.deleteMany({});
  await JournalEntry.deleteMany({});

  await Product.insertMany(products);
  await JournalEntry.insertMany(journal);

  console.log(`✔ Seeded ${products.length} products, ${journal.length} journal entries.`);
  await mongoose.disconnect();
}

run().catch((err) => { console.error(err); process.exit(1); });
