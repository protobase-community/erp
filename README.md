# ERP

A sample ERP for small and medium companies: customers and contacts (CRM), a product catalog, sales orders and
invoices, inventory across warehouses, and HR, for several organizations at once. It runs on a real Postgres 18
database with five module schemas, seeded deterministically with Dutch, German and English companies, EUR prices and
three years of history (up to 2026-10-06), so every screen has realistic data from the start.

## Use this template

Press **Use this template** at the top of this page, then **Create a new repository**, to get your own copy with a
clean history. Clone it and follow the setup below:

```sh
git clone https://github.com/<you>/<your-repository>.git
cd <your-repository>
```

## Setup

You need [Bun](https://bun.sh) 1.4 and Docker.

```sh
bun install
bun run db:up                     # Postgres 18 in Docker on port 55432; creates .env from .env.example
bun run db:migrate
bun run db:seed --scale small     # small | medium | large
bun run protobase users create you@example.com --generate-password
bun run dev                       # http://localhost:5173
bun run test                      # the unit tests next to the config and the seed
```

Set your own `BETTER_AUTH_SECRET` in `.env` (`openssl rand -base64 32`). The first user owns the seeded organizations;
[Login](#login) says how others join.

## Built with Protobase

[Protobase](https://github.com/PrototeamHQ/protobase) builds the app from a Postgres database and a typed config: each table's data config sits in
`config/<name>/data.ts` and its screens in `config/<name>/ui.ts`, all exported from `config/index.ts`, and
`protobase dev` and `protobase serve` serve the API and the app from them.

- Tested with Protobase **0.45.9**: the `@protobase/*` packages are pinned to it in `package.json`, and CI runs
  against it. To upgrade, set the new version on each `@protobase/*` package, run `bun install`, then
  `bun run typecheck`, `bun run test` and `bun run build`. The [release notes](https://github.com/PrototeamHQ/protobase/releases) say what changed.
- Docs: [docs.protobase.net](https://docs.protobase.net). Source and issues: [PrototeamHQ/protobase](https://github.com/PrototeamHQ/protobase).
- This app started as an example in Protobase's repository; its history came with it.
- The same app is the `erp` preset that new Protobase apps can start from ([`@protobase/presets`](https://github.com/PrototeamHQ/protobase/tree/main/packages/presets)).

## Database

Other scripts: `db:seed:base` (the countries, the currencies and organization 1, named with `--name`: what an app made from the ERP preset starts with), `db:reset` (drop, migrate, seed small), `typecheck`. `bun run db:down` stops the container; the `pgdata` volume stays, remove it with `docker compose down -v`. The database tests run in [Protobase's repository](https://github.com/PrototeamHQ/protobase) (`bun run test:integration`).

Connection string (port 55432 avoids a local Postgres on 5432):

```
postgres://protobase:protobase@localhost:55432/protobase
```

Scripts read `DATABASE_URL` from the environment or from the git-ignored `.env` next to `package.json` (a copy of `.env.example`), and fall back to the string above.

## Tables

| Schema | Tables |
| --- | --- |
| `core` | `organizations`, `users`, `countries` (key: ISO code), `currencies` |
| `crm` | `companies` (trigram index on `name`), `people`, `tags`, `company_tags` (join table with `added_by`, `added_at`) |
| `catalog` | `categories` (`parent_id` tree with `position`), `products` (bigint identity, `jsonb attributes`, soft delete via `deleted_at`) |
| `sales` | `orders` (uuid v7 key), `order_lines` (key `(order_id, line_no)`), `invoices` (enum `invoice_status`), `invoice_lines` (`position`, generated `line_total`) |
| `inventory` | `warehouses`, `locations` (`ltree path`), `stock_moves` (append-only, no `updated_at`), `stock_levels` (derived from the moves) |
| `hr` | `"EMP_MASTER"` (legacy, uppercase columns) |

Every table has `organization_id` except `countries`, `currencies` and `organizations` itself. The seed creates two organizations (70/30 split of the volumes) so tenant isolation can be tested.

Seed consistency: an invoice's subtotal equals the sum of its lines and an order's total equals the sum of its lines; `stock_levels` equals the sum of `stock_moves` per product and location and never goes negative. Invoices exist for shipped and delivered orders.

## Scales

| Scale | Companies | Orders | Stock moves | Products | Seed time (Apple silicon, local Docker) |
| --- | --- | --- | --- | --- | --- |
| small | 200 | 2,000 | 20,000 | 200 | about 1 s |
| medium | 20,000 | 200,000 | 1,000,000 | 2,000 | about 50 s (660 MB) |
| large | 20,000 | 200,000 | 10,000,000 | 2,000 | not timed since foreign keys are checked (2.8 GB) |

`db:seed` truncates everything first, so it can be re-run or used to switch scale. The loader streams `COPY`, drops secondary indexes during the load and rebuilds them afterwards, switches the tables' own triggers off while it writes the totals they compute, then resets identity sequences and runs `ANALYZE` so `pg_stats` is populated. Foreign keys are checked throughout: the role an app gets may not skip them. The scale last seeded is recorded in `public.seed_info`.

## Layout

- `db/migrations/NNN_name.sql`: plain SQL, applied in order and recorded in `public.schema_migrations` by `db/migrate.ts`.
- `seed/`: `world.ts` allocates ids per organization, `builders/` rebuild a company, product or order from its ordinal alone, `steps/` stream one module each. `base.ts` is the base seed.
- `AGENTS.md`: the rules for the assistant that changes an app made from this example, which is also the ERP preset ([`packages/presets`](https://github.com/PrototeamHQ/protobase/tree/main/packages/presets); the preset leaves this README out).
- `tests/postgres/erp-seed.test.ts` in [Protobase's repository](https://github.com/PrototeamHQ/protobase) (in the Postgres suite): checks the medium seed's counts, invoice totals, stock levels, composite keys and `pg_stats`.

## Login

`bun run db:migrate` also creates Better Auth's tables in the `auth` schema of the ERP database (`db/migrations/009_auth.sql`; later ones come from `protobase auth migration`); `bun run serve` (or `protobase dev`) then needs `BETTER_AUTH_SECRET` in `.env` and serves real sign-in. See [Login with Better Auth](https://docs.protobase.net/reference/auth/). There is no passwordless mode: create the first admin with `protobase users create <email>`, and mint a bearer token for curl with `protobase token <email>`.

The ERP has [organizations](https://docs.protobase.net/reference/auth/#organizations) on (`auth/auth.ts`): the seed writes its organizations to the auth schema too, under the ids its records use, and the first user owns them. Everyone else joins one with an organization role and app roles, by invitation in the app or on the host:

```sh
protobase users create sanne@example.com --organization rijnland --org-role admin --app-roles manager
protobase organizations add-member nordlicht sanne@example.com --app-roles sales
protobase organizations list
```

A new organization takes the next id of `core.organizations` and gets its row there (`onCreated`). A new user takes the next id of `core.users` (`generateUserId`), which orders name as their owner, and gets their row there when they first join an organization (`db/migrations/019_auth_users.sql`), so `sales` sees and changes the orders they own; the ERP's own `role` column stays empty for them, since their roles live in the auth schema.

## Serve and deploy

The ERP has no server code of its own: `protobase.config.ts` exports the config, `auth` and `authenticate`, and protobase serves it.

```sh
bun run serve    # protobase build, then protobase serve dist on port 8787 (PORT): the UI and the API, from source
```

For a deployment, ship the bundle folder: the host serves its `public/` and runs its config module with the serve runtime under Bun:

```sh
bun run build    # dist/: the config module, the app and protobase.ui.tsx as a plugin in public/, and protobase.bundle.json
bun run protobase build-serve    # protobase-serve.js, the runtime
bun --no-install /opt/protobase/protobase-serve.js /app/protobase.config.js
```

The host passes `DATABASE_URL`, `PORT`, `REQUEST_LOG` (`true` logs every request), and for password reset `PROTOBASE_SMTP_URL` and `PROTOBASE_MAIL_FROM`; the ERP itself reads `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, and `TRUSTED_ORIGINS`. Run `db:migrate` against the database before the first start. The bundle's shape and the runtime's lifecycle are in the [CLI reference](https://docs.protobase.net/reference/cli/#build).

## Contributing

Contributions are welcome, from a typo to a new screen: see [CONTRIBUTING.md](CONTRIBUTING.md). A problem in Protobase
itself goes to [Protobase's issues](https://github.com/PrototeamHQ/protobase/issues).

## Licence

[Apache License 2.0](LICENSE).
