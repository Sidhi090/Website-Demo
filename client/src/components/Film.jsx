import { useEffect, useRef, useState } from 'react';

const POSTER = 'https://images.unsplash.com/photo-1485518882345-15568b007407?w=1800&q=80&auto=format&fit=crop';
const VIDEO  = 'https://videos.pexels.com/video-files/3209828/3209828-uhd_2560_1440_25fps.mp4';

const PLAY_D  = 'M5 3.5v17l15-8.5-15-8.5z';
const PAUSE_D = 'M7 4h4v16H7zM13 4h4v16h-4z';

export default function Film() {
  const blockRef = useRef(null);
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(true);

  // Reflect <video> state in the button + class.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onPlay  = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    v.addEventListener('play', onPlay);
    v.addEventListener('pause', onPause);
    return () => {
      v.removeEventListener('play', onPlay);
      v.removeEventListener('pause', onPause);
    };
  }, []);

  // Auto-pause when scrolled out of view; resume when back.
  useEffect(() => {
    const v = videoRef.current;
    const b = blockRef.current;
    if (!v || !b) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) v.play().catch(() => {});
          else v.pause();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(b);
    return () => io.disconnect();
  }, []);

  const toggle = (e) => {
    e?.stopPropagation?.();
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  return (
    <section
      ref={blockRef}
      className={`film${playing ? ' playing' : ''}`}
      data-screen-label="04 Film"
      onClick={toggle}
    >
      <img className="film-poster" src={POSTER} alt="" />
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        poster={POSTER}
      >
        <source src={VIDEO} type="video/mp4" />
      </video>

      <div className="film-overlay">
        <div className="film-eyebrow reveal">A short film · 02:14</div>
        <h2 className="film-title reveal d1">
          In the atelier,<br /><em>before the city wakes.</em>
        </h2>
        <div className="film-bottom">
          <div className="meta reveal d2">
            Directed by <strong>Aiko Tanabe</strong><br />
            Filmed in Sangenjaya · Spring 2026
          </div>
          <button className="play-btn reveal d3" aria-label="Play film" onClick={toggle}>
            <span className="ring">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d={playing ? PAUSE_D : PLAY_D} />
              </svg>
            </span>
            <span>{playing ? 'Pause' : 'Watch the film'}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
