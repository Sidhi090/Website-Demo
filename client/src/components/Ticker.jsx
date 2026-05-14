const ITEMS = [
  'Autumn / Winter 26',
  'Made in Tokyo',
  'Hand-finished',
  'Slow craft, considered cuts',
  'Free shipping over ¥25,000',
];

export default function Ticker() {
  // Duplicate the list so the scroll loops seamlessly (50% translate in CSS).
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {doubled.map((t, i) => <span key={i}>{t}</span>)}
      </div>
    </div>
  );
}
