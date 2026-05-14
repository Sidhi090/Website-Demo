import { useEffect, useState } from 'react';
import { api } from '../api.js';

const CATEGORIES = ['All', 'Outerwear', 'Tops', 'Bottoms', 'Accessories'];

const imageUrl = (id, w = 900) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;

const fallbackProducts = [
  { slug: 'asymmetric-wool-coat', name: 'Asymmetric Wool Coat', collection: 'noir', category: 'outerwear', pieceNo: 1, priceJPY: 84000, image: imageUrl('1551803091-e20673f15770'), tag: 'New' },
  { slug: 'linen-drape-blouse', name: 'Linen Drape Blouse', collection: 'blanc', category: 'tops', pieceNo: 3, priceJPY: 28500, image: imageUrl('1572804013309-59a88b7e92f1'), tag: '' },
  { slug: 'wide-tailored-trouser', name: 'Wide Tailored Trouser', collection: 'noir', category: 'bottoms', pieceNo: 7, priceJPY: 42000, image: imageUrl('1583846783214-7229a91b20ed'), tag: 'Limited' },
  { slug: 'silk-crepe-shirt', name: 'Silk Crepe Shirt', collection: 'blanc', category: 'tops', pieceNo: 6, priceJPY: 31500, image: imageUrl('1594633312681-425c7b97ccd1'), tag: '' },
  { slug: 'cashmere-knit-vest', name: 'Cashmere Knit Vest', collection: 'noir', category: 'tops', pieceNo: 4, priceJPY: 56000, image: imageUrl('1496747611176-843222e1e57c'), tag: 'New' },
  { slug: 'canvas-shoulder-bag', name: 'Canvas Shoulder Bag', collection: 'blanc', category: 'accessories', pieceNo: 5, priceJPY: 18200, image: imageUrl('1496440737103-cd596325d314'), tag: '' },
];

const getFallbackProducts = (filter) => {
  if (filter === 'All') return fallbackProducts;
  return fallbackProducts.filter((product) => product.category === filter.toLowerCase());
};

const formatJPY = (n) => `¥${Number(n).toLocaleString('en-US')}`;

export default function SelectedPieces() {
  const [filter, setFilter] = useState('All');
  const [items, setItems] = useState(fallbackProducts);

  useEffect(() => {
    const params = filter === 'All' ? {} : { category: filter.toLowerCase() };

    api.products(params)
      .then((data) => setItems(data.length ? data : getFallbackProducts(filter)))
      .catch(() => setItems(getFallbackProducts(filter)));
  }, [filter]);

  return (
    <section className="section" data-screen-label="05 Selected Pieces">
      <div className="pieces-head">
        <h2 className="reveal">Selected <em>pieces</em><br />this week</h2>
        <div className="controls reveal d2">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              className={`pill${filter === category ? ' active' : ''}`}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="pieces-grid">
        {items.map((product, idx) => {
          const fallbackImage = fallbackProducts[idx % fallbackProducts.length].image;

          return (
            <a key={product.slug} className={`piece reveal${idx % 4 ? ' d' + (idx % 4) : ''}`} href={`/p/${product.slug}`}>
              <div className="piece-img">
                {product.tag && <span className="piece-tag">{product.tag}</span>}
                <img
                  src={product.image || fallbackImage}
                  alt={product.name}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  onError={(event) => {
                    event.currentTarget.src = fallbackImage;
                  }}
                />
              </div>
              <div className="piece-meta">
                <div className="piece-name">
                  {product.name}
                  <small>{product.collection === 'noir' ? 'Noir' : 'Blanc'} / {String(product.pieceNo).padStart(2, '0')}</small>
                </div>
                <div className="piece-price">{formatJPY(product.priceJPY)}</div>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
