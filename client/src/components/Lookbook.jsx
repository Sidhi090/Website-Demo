const U = (id, w = 900) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;

export default function Lookbook() {
  return (
    <section className="lookbook" data-screen-label="06 Lookbook">
      <div className="lookbook-text reveal">
        <div className="eyebrow">Editorial · A/W 26</div>
        <h2>Quiet hours,<br /><em>spent slowly.</em></h2>
        <p>
          Shot at first light in a former carpentry workshop in Yanaka. The full lookbook
          gathers 38 frames across both collections — a film by Aiko Tanabe, styling by Maru Suzuki.
        </p>
        <a href="#" className="button">
          View the lookbook
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </a>
      </div>

      <div className="lookbook-frames reveal d2">
        <div className="frame tall" style={{ backgroundImage: `url(${U('1542718610-a1d656d1884c')})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="frame-caption"><span>Frame 14</span><span>Yanaka</span></div>
        </div>
        <div className="frame short" style={{ backgroundImage: `url(${U('1559561853-08451507cbe7')})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="frame-caption"><span>Frame 22</span><span>Noir Vol. 01</span></div>
        </div>
      </div>
    </section>
  );
}
