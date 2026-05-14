import { useEffect, useState } from 'react';

const U = (id, w = 900) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;

// Three slides, each with three figure photos (left/mid/right).
const SLIDES = [
  [U('1551803091-e20673f15770'), U('1517841905240-472988babdf9'), U('1539109136881-3be0616acf4b')],
  [U('1488161628813-04466f872be2'), U('1490481651871-ab68de25d43d'), U('1469334031218-e382a71b716b')],
  [U('1515886657613-9f3515b0c78f'), U('1503342217505-b0a15ec3261c'), U('1492707892479-7bc8d5a4ee93')],
];

const pad = (n) => String(n).padStart(2, '0');

export default function Hero() {
  const [i, setI] = useState(1); // start on slide 2 (the "02" feel from the reference)
  const total = SLIDES.length;
  const go = (to) => setI(((to % total) + total) % total);

  // Auto-advance every 6s
  useEffect(() => {
    const t = setInterval(() => setI((cur) => (cur + 1) % total), 6000);
    return () => clearInterval(t);
  }, [total]);

  return (
    <section className="hero" id="hero" data-screen-label="01 Hero — The Collection">
      <div className="hero-track">
        {SLIDES.map((figures, idx) => (
          <div key={idx} className={`hero-slide${idx === i ? ' active' : ''}`} data-slide={idx + 1}>
            <div className="hero-figures">
              <div className="hero-fig left">
                <div className="placeholder-figure f-left" style={{ backgroundImage: `url(${figures[0]})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
              </div>
              <div className="hero-fig mid">
                <div className="placeholder-figure f-mid" style={{ backgroundImage: `url(${figures[1]})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
              </div>
              <div className="hero-fig right">
                <div className="placeholder-figure f-right" style={{ backgroundImage: `url(${figures[2]})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <h1 className="hero-title">
        <span className="row">The</span>
        <span className="row it">Collection</span>
        <small>Autumn / Winter — Edition 02</small>
      </h1>

      <div className="hero-numeral" aria-hidden="true">
        <span className="digit">{pad(i + 1)}</span>
      </div>

      <div className="hero-controls">
        <button aria-label="Previous" onClick={() => go(i - 1)}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M15 6l-6 6 6 6" /></svg>
        </button>
        <span className="counter">
          <span>{pad(i + 1)}</span> <span className="total">/ {pad(total)}</span>
        </span>
        <button aria-label="Next" onClick={() => go(i + 1)}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M9 6l6 6-6 6" /></svg>
        </button>
      </div>

      <div className="scroll-cue">Scroll</div>
    </section>
  );
}
