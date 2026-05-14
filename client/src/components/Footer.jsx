const COLS = [
  { title: 'Shop',   links: [['Noir Collection', '#noir'], ['Blanc Collection', '#blanc'], ['Archive', '#'], ['Gift cards', '#']] },
  { title: 'Studio', links: [['About', '#'], ['Journal', '#journal'], ['Stockists', '#'], ['Press', '#']] },
  { title: 'Help',   links: [['Sizing', '#'], ['Care', '#'], ['Shipping & returns', '#'], ['Contact', '#']] },
  { title: 'Visit',  links: [['2-14-9 Sangenjaya', '#'], ['Setagaya, Tokyo', '#'], ['Wed–Sun · 12–19', '#'], ['hello@asa.studio', 'mailto:hello@asa.studio']] },
];

export default function Footer() {
  return (
    <footer id="footer" data-screen-label="09 Footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="word">ASA<span style={{ fontStyle: 'italic', fontWeight: 300 }}>.</span></div>
          <p>A small Tokyo studio. Two collections, finished by hand, in two colours we trust.</p>
        </div>
        {COLS.map((c) => (
          <div key={c.title} className="footer-col">
            <h4>{c.title}</h4>
            <ul>
              {c.links.map(([label, href]) => (
                <li key={label}><a href={href}>{label}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="footer-bottom">
        <span>© 2026 ASA Studio · Tokyo</span>
        <span>Privacy · Terms · Imprint</span>
      </div>
    </footer>
  );
}
