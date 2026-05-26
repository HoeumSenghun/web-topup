# Diamond Shop — Cambodia Game Top-Up

Production-ready Next.js storefront for game diamond top-ups (MLBB, Free Fire, PUBG, and more). Inspired by Cambodian top-up sites with English/Khmer support, light/dark themes, and a full top-up flow.

## Stack

- Next.js 16 App Router (JavaScript)
- Tailwind CSS v4
- Static generation for SEO (`○` prerendered home page)
- Mock data in `src/data/mock.js` — swap for API later

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
src/
├── app/              # Layout, page, robots, sitemap (.js)
├── components/       # React components use .jsx
│   ├── home/         # Hero, games, top-up form
│   ├── layout/       # Navbar, footer, ticker
│   └── ui/           # GameCard, breadcrumbs
├── context/          # AppContext.jsx
├── data/mock.js      # Games, packages, payments, copy keys
└── lib/              # i18n, SEO metadata
```

## Customize

| What | File |
|------|------|
| Site name, contact | `src/data/mock.js` → `siteConfig` |
| Games & packages | `src/data/mock.js` → `games` |
| English/Khmer text | `src/lib/i18n.js` |
| Colors & theme | `src/app/globals.css` CSS variables |
| SEO title/description | `src/lib/seo.js` |

## Top-up flow

1. Click a game → `/topup/[gameId]`
2. **Server + User ID** (verify account) → **Package** → **Payment** → **Receipt**

## Architecture (services → actions)

```
src/services/     # Business logic (game, player, order, payment)
src/actions/      # Server Actions called from pages & client
src/app/api/      # Optional REST layer (uses same services)
```

Pages call `getGames()`, `getGame()`, `getPayments()` from `@/actions/*`.  
Client top-up uses `verifyPlayer()` and `submitOrder()` server actions.

Locale & theme: `@/actions/preferences` + cookies.
