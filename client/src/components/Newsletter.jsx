import { useState } from 'react';
import { api } from '../api.js';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState('idle'); // idle | sending | done | error
  const [err, setErr] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setState('sending');
    try {
      await api.subscribe(email);
      setEmail('');
      setState('done');
    } catch (e) {
      setErr(e.message);
      setState('error');
    }
  };

  return (
    <section className="newsletter" data-screen-label="08 Newsletter">
      <div className="reveal">
        <div className="eyebrow">A letter, never often</div>
        <h2>Six letters a year,<br /><em>nothing else.</em></h2>
      </div>
      <form className="reveal d2" onSubmit={submit}>
        <div className="news-form">
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" disabled={state === 'sending'}>
            {state === 'done' ? 'Thank you' : state === 'sending' ? '…' : 'Subscribe'}
          </button>
        </div>
        <p className="news-fine">
          {state === 'error'
            ? `Couldn't subscribe: ${err}`
            : `We write when there's something to say — new collections, studio openings, the occasional essay. Unsubscribe in one click.`}
        </p>
      </form>
    </section>
  );
}
