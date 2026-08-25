# Travel Webbie Backend + Client Deployment

This repository has two apps:

- `/server` → Node.js + Express API
- `/client` → React + Vite frontend

## 1) Deploy the API (`/server`)

Use any Node hosting provider (Render/Railway/Fly.io).

- **Root directory:** `server`
- **Install command:** `npm install`
- **Start command:** `npm start`

Required environment variables:

- `MONGO_URI`
- `JWT_SECRET`
- `PORT` (optional, most platforms inject this)

Health endpoint:

- `GET /` returns `Welcome to Travel Vault API 🚀`

## 2) Deploy the frontend (`/client`)

Use any static hosting provider (Vercel/Netlify/Render Static Site).

- **Root directory:** `client`
- **Install command:** `npm install`
- **Build command:** `npm run build`
- **Publish directory:** `dist`

Set this environment variable in frontend hosting:

- `VITE_API_BASE_URL=https://<your-api-domain>/api`

If `VITE_API_BASE_URL` is not set, the app falls back to:

- `https://travelwebbie.onrender.com/api`

## 3) Verify production

- Register and log in
- Create a trip
- Add an expense
- Open dashboard
