import { useEffect, useState } from 'react';
import { api } from '../api.js';

const CATEGORIES = ['All', 'Outerwear', 'Tops', 'Bottoms', 'Accessories'];

const formatJPY = (n) =>
  '¥' + Number(n).toLocaleString('en-US');

export default function SelectedPieces() {
  const [filter, setFilter] = useState('All');
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const params = filter === 'All' ? {} : { category: filter.toLowerCase() };
    api.products(params)
      .then(setItems)
      .catch((err) => setError(err.message));
  }, [filter]);

  return (
    <section className="section" data-screen-label="05 Selected Pieces">
      <div className="pieces-head">
        <h2 className="reveal">Selected <em>pieces</em><br />this week</h2>
        <div className="controls reveal d2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              className={`pill${filter === c ? ' active' : ''}`}
              onClick={() => setFilter(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {error && <p style={{ color: '#a33', fontFamily: 'serif' }}>Couldn't load products: {error}</p>}

      <div className="pieces-grid">
        {items.map((p, idx) => (
          <a key={p.slug} className={`piece reveal${idx % 4 ? ' d' + (idx % 4) : ''}`} href={`/p/${p.slug}`}>
            <div className="piece-img">
              {p.tag && <span className="piece-tag">{p.tag}</span>}
              <img src={p.image} alt={p.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div className="piece-meta">
              <div className="piece-name">
                {p.name}
                <small>{p.collection === 'noir' ? 'Noir' : 'Blanc'} · {String(p.pieceNo).padStart(2, '0')}</small>
              </div>
              <div className="piece-price">{formatJPY(p.priceJPY)}</div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
