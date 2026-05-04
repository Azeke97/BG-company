# Local Setup (Shop + Landing + Mini Admin)

## 1) Environment

```bash
cp .env.example .env
```

Minimum required values for local run:

- `DATABASE_URL`
- (optional) Google Sheets envs for `/api/contact`

## 2) Start PostgreSQL

```bash
docker compose up -d db
```

Database defaults:

- host: `localhost`
- port: `5433`
- db: `bg_company`
- user: `app`
- password: `super_password`

## 3) Prisma migrate + generate + seed

```bash
npx prisma migrate dev --name init_local
npx prisma generate
npx prisma db seed
```

## 4) Run app

```bash
npm run dev
```

App:

- site: `http://localhost:3000` (or next free port)
- admin: `http://localhost:3000/admin`

## 5) Useful checks

```bash
npm run tsc
npm run lint
```
