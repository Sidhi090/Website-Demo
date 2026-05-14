import { useEffect, useState } from 'react';
import { api } from '../api.js';

const imageUrl = (id, w = 900) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;

const fallbackEntries = [
  {
    slug: 'weight-of-an-unfinished-hem',
    title: 'On the weight of an unfinished hem',
    excerpt: 'A short note from the cutting floor on why we leave certain edges raw, and others sealed by hand.',
    category: 'Field Notes',
    image: imageUrl('1521334884684-d80222895322'),
    publishedAt: '2026-05-02',
  },
  {
    slug: 'dye-gardens-of-awa',
    title: 'Inside the dye gardens of Awa',
    excerpt: 'Three days spent with the Watanabe family, who still grow their own indigo on a mountainside in Tokushima.',
    category: 'Studio Visit',
    image: imageUrl('1622445275576-721325763afe'),
    publishedAt: '2026-04-19',
  },
  {
    slug: 'twelve-patterns-eight-years-apart',
    title: 'Twelve patterns, eight years apart',
    excerpt: 'Some shapes return because we forget them, some because we never quite finish thinking through them.',
    category: 'Process',
    image: imageUrl('1571513800374-df1bbe650e56'),
    publishedAt: '2026-03-28',
  },
];

const fallbackImageBySlug = fallbackEntries.reduce((acc, entry) => {
  acc[entry.slug] = entry.image;
  return acc;
}, {});

const formatDate = (d) => {
  const date = new Date(d);
  return date
    .toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
    .replace(',', ' /');
};

export default function Journal() {
  const [entries, setEntries] = useState(fallbackEntries);

  useEffect(() => {
    api.journal()
      .then((data) => setEntries(data.length ? data : fallbackEntries))
      .catch(() => setEntries(fallbackEntries));
  }, []);

  return (
    <section className="section" id="journal" data-screen-label="07 Journal">
      <div className="journal-head">
        <h2 className="reveal">From the <em>journal</em></h2>
        <a className="view-all reveal d1" href="#">All entries &rarr;</a>
      </div>

      <div className="journal-grid">
        {entries.map((entry, idx) => {
          const fallbackImage = fallbackEntries[idx % fallbackEntries.length].image;
          const image = entry.image || fallbackImageBySlug[entry.slug] || fallbackImage;

          return (
            <article key={entry.slug} className={`article reveal${idx ? ' d' + (idx + 1) : ''}`}>
              <div className="article-img">
                <img
                  src={image}
                  alt=""
                  loading="lazy"
                  onError={(event) => {
                    event.currentTarget.src = fallbackImage;
                  }}
                />
              </div>
              <div className="article-date">{formatDate(entry.publishedAt)} - {entry.category}</div>
              <h3 className="article-title">{entry.title}</h3>
              <p className="article-excerpt">{entry.excerpt}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
