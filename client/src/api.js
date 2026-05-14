// Tiny fetch wrapper — talks to the Express API.
// In dev, Vite proxies /api → http://localhost:5000 (see vite.config.js).
// In prod (NODE_ENV=production on the server), Express serves both.

const json = async (res) => {
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || `HTTP ${res.status}`);
  return res.json();
};

export const api = {
  products: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return fetch(`/api/products${q ? `?${q}` : ''}`).then(json);
  },
  product: (slug) => fetch(`/api/products/${slug}`).then(json),
  journal: () => fetch('/api/journal').then(json),
  subscribe: (email) =>
    fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    }).then(json),
};
