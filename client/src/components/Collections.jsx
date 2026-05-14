const U = (id, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;

const TILES = [
  {
    id: 'noir',
    klass: 'black',
    index: '01',
    vol: 'Vol. 01',
    title: 'Noir',
    meta: '42 pieces · Wool · Wool-linen · Cashmere',
    image: U('1502716119720-b23a93e5fe1b'),
  },
  {
    id: 'blanc',
    klass: 'white',
    index: '02',
    vol: 'Vol. 02',
    title: 'Blanc',
    meta: '31 pieces · Linen · Cotton · Silk',
    image: U('1604066867775-43f48e3957d8'),
  },
];

export default function Collections() {
  return (
    <section className="collections" id="collections" data-screen-label="03 Collections">
      {TILES.map((t) => (
        <a key={t.id} className={`collection ${t.klass}`} href={`#${t.id}`} id={t.id}>
          <div className="col-bg" />
          <div className="col-index">{t.index}</div>
          <div
            className="col-slot"
            style={{
              backgroundImage: `url(${t.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="col-content">
            <div>
              <span className="col-num">{t.vol}</span>
              <div className="col-title">{t.title}<em>.</em></div>
              <span className="col-meta">{t.meta}</span>
            </div>
            <span className="col-link">Explore →</span>
          </div>
        </a>
      ))}
    </section>
  );
}
