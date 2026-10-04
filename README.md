# BG Company

Nuxt 4 project: landing + service pages + mini-shop backend + mini admin.

## Quick Start

```bash
npm install
cp .env.example .env
npm run db:up
npm run db:migrate
npm run db:generate
npm run db:seed
npm run dev
```

## Main Routes

**Landing & services** (static content, do not edit)
- `/` — landing page
- `/services`, `/services/renovation`, `/services/ceilings`, `/services/carpentry`

**Shop**
- `/shop` — catalog (filters, search, sort)
- `/shop/[categorySlug]` — catalog filtered by category
- `/shop/product/[slug]` — product detail page
- `/shop/checkout` — checkout (customer info, promo code, payment method)
- `/shop/checkout/success` — order confirmation

**Admin** (session-protected, redirects to `/admin/login` if not authenticated)
- `/admin/login` — admin sign-in
- `/admin` — dashboard (sales by day, status breakdown, top products)
- `/admin/categories`, `/admin/products`, `/admin/orders`, `/admin/promos`, `/admin/users`

All `/admin/**` pages and every `/api/admin/**` endpoint (except `/api/admin/auth/**`) require a valid admin session cookie.

## Test Accounts

Seeded by `npm run db:seed`, controlled by `.env` (`ADMIN_SEED_EMAIL` / `ADMIN_SEED_PASSWORD`, defaults below). **Dev/test only — rotate before any real deployment.**

| Role  | Login             | Password     |
|-------|--------------------|--------------|
| Admin | `admin@bg.local`  | `admin12345` |

Seeded promo code for manual testing: `WELCOME10` (10% off, usage limit 100).

## Useful Commands

```bash
npm run tsc
npm run lint
npm run build
```

## Docs

- Local setup: [docs/local-setup.md](docs/local-setup.md)
- DB tables: [docs/db-tables.md](docs/db-tables.md)
