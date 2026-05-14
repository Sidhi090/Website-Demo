import { useEffect } from 'react';

import TopBar from './components/TopBar.jsx';
import SocialRail from './components/SocialRail.jsx';
import Hero from './components/Hero.jsx';
import Ticker from './components/Ticker.jsx';
import Statement from './components/Statement.jsx';
import Collections from './components/Collections.jsx';
import Film from './components/Film.jsx';
import SelectedPieces from './components/SelectedPieces.jsx';
import Lookbook from './components/Lookbook.jsx';
import Journal from './components/Journal.jsx';
import Newsletter from './components/Newsletter.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  // Scroll-reveal: any element with className includes 'reveal' fades up when it enters view.
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <TopBar />
      <SocialRail />
      <Hero />
      <Ticker />
      <Statement />
      <Collections />
      <Film />
      <SelectedPieces />
      <Lookbook />
      <Journal />
      <Newsletter />
      <Footer />
    </>
  );
}
