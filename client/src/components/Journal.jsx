import { useEffect, useState } from 'react';
import { api } from '../api.js';

const formatDate = (d) => {
  const date = new Date(d);
  return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
    .replace(',', ' ·');
};

export default function Journal() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    api.journal().then(setEntries).catch(() => setEntries([]));
  }, []);

  return (
    <section className="section" id="journal" data-screen-label="07 Journal">
      <div className="journal-head">
        <h2 className="reveal">From the <em>journal</em></h2>
        <a className="view-all reveal d1" href="#">All entries →</a>
      </div>

      <div className="journal-grid">
        {entries.map((e, idx) => (
          <article key={e.slug} className={`article reveal${idx ? ' d' + (idx + 1) : ''}`}>
            <div
              className="article-img"
              style={{ backgroundImage: `url(${e.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            />
            <div className="article-date">{formatDate(e.publishedAt)} — {e.category}</div>
            <h3 className="article-title">{e.title}</h3>
            <p className="article-excerpt">{e.excerpt}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
