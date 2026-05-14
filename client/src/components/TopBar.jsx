import { useEffect, useState } from 'react';

export default function TopBar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('#noir');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const NavLink = ({ href, label }) => (
    <a
      href={href}
      className={active === href ? 'active' : ''}
      onClick={() => setActive(href)}
    >
      {label}
    </a>
  );

  return (
    <header className={`topbar${scrolled ? ' scrolled' : ''}`} data-screen-label="Home — Top">
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <button className="menu-btn" aria-label="Menu">
          {Array.from({ length: 9 }).map((_, i) => <span key={i} />)}
        </button>
      </div>

      <nav className="nav" aria-label="Primary">
        <NavLink href="#noir"    label="Noir" />
        <NavLink href="#blanc"   label="Blanc" />
        <NavLink href="#journal" label="News" />
        <NavLink href="#footer"  label="Contact" />
      </nav>

      <div className="actions">
        <button className="icon-btn" aria-label="Search">
          <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5" /><path d="M16 16l4 4" /></svg>
        </button>
        <button className="icon-btn" aria-label="Cart">
          <svg viewBox="0 0 24 24"><path d="M3 5h2l2.5 12h12L22 8H6" /><circle cx="9" cy="20" r="1.2" /><circle cx="18" cy="20" r="1.2" /></svg>
          <span className="cart-dot" />
        </button>
        <button className="icon-btn" aria-label="Account">
          <svg viewBox="0 0 24 24"><circle cx="12" cy="9" r="3.6" /><path d="M5 20c1.5-3.5 4.2-5 7-5s5.5 1.5 7 5" /></svg>
        </button>
      </div>
    </header>
  );
}
