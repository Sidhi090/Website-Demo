# ASA — Tokyo Fashion Studio (MERN)

A full-stack version of the ASA website. Same design, same content, but built on the MERN stack:

- **M**ongoDB (Mongoose) — products, journal entries, newsletter subscribers
- **E**xpress — REST API at `/api/products`, `/api/journal`, `/api/newsletter`
- **R**eact (Vite) — every section of the design is a component
- **N**ode — runs the API server

```
mern/
├── client/          # React frontend (Vite)
│   ├── src/
│   │   ├── components/   # Hero, Collections, Film, SelectedPieces, …
│   │   ├── api.js        # fetch helpers
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── index.html
│   └── vite.config.js
├── server/          # Express + MongoDB
│   ├── models/      # Product, JournalEntry, Subscriber
│   ├── routes/      # products, journal, newsletter
│   ├── server.js    # entry
│   └── seed.js      # populates Mongo with the demo content
└── package.json     # root scripts (concurrently)
```

## 1 · Prerequisites

- Node 18+
- MongoDB running locally (`mongodb://127.0.0.1:27017`) OR a hosted URI

## 2 · Install everything

```bash
cd mern
npm run install:all
```

## 3 · Configure server env

```bash
cp server/.env.example server/.env
# edit MONGO_URI if not using localhost
```

## 4 · Seed the database

```bash
npm run seed
```

This loads the 8 products, 3 journal entries, and creates indexes.

## 5 · Run dev mode

```bash
npm run dev
```

- Client: http://localhost:5173
- API:    http://localhost:5000/api

Vite proxies `/api/*` to the Express server (configured in `client/vite.config.js`), so the React app calls relative URLs.

## 6 · Build for production

```bash
npm run build       # builds client/dist
npm start           # serves built client + API from Express
```

## API reference

| Method | Path                  | Body                  | Returns                         |
|--------|-----------------------|-----------------------|---------------------------------|
| GET    | `/api/products`       | —                     | `Product[]` (optionally filter by `?collection=noir`) |
| GET    | `/api/products/:slug` | —                     | `Product`                       |
| GET    | `/api/journal`        | —                     | `JournalEntry[]`                |
| POST   | `/api/newsletter`     | `{ email }`           | `{ ok: true }`                  |

## Notes on the design

Every section in the original HTML mockup is now a discrete React component under `client/src/components/`. Styling lives in one `styles.css` (BEM-ish class names match the component file). Real photography is served from Unsplash hotlink URLs stored in the seeded Mongo data — swap them for your own CDN URLs after seeding.
