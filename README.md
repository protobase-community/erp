# ERP

An ERP for an industrial supplier: companies and contacts, a product catalog, sales orders and invoices,
inventory across warehouses, and HR. 19 resources across 6 schemas, including a legacy `hr."EMP_MASTER"` table shown as
Employees, and 8 roles, from sales and the warehouse to the auditor. It has a sales overview page, an API function, a
nightly job on Amsterdam time, organizations, cost fields that only some roles may read, and a bottom bar for the
warehouse on phones.

The seed holds two organizations and three years of history, from a small set up to 10,000,000 stock moves: a
supplier in Singapore selling in Singapore dollars, and one in Japan selling in yen with its catalog in Japanese. Their
customers, contacts and staff come from 24 countries, written as they are there (see [Sample data](#sample-data)), so a
change that mishandles a script, a missing family name or a postal code shows up in the sample data.

## Run it locally

You need [Bun](https://bun.sh) 1.4 and Docker.

```sh
bun install
bun run db:up                     # Postgres 18 in Docker on port 55433; creates .env from .env.example
bun run db:migrate
bun run db:seed --scale small     # small | medium | large
bun run protobase users create you@example.com --generate-password
bun run dev                       # http://localhost:5173
bun run test
```

Working with a coding agent? `bun run protobase skill install` copies the Protobase skills of this version into
`.claude/skills` and `.agents/skills`, where Claude Code, Codex, Cursor and others read them; run it again after an
upgrade.

Set your own `PROTOBASE_SECRET` in `.env` (`openssl rand -base64 32`). The first user owns the seeded organizations;
[Login](#login) says how others join. `bun run db:down` stops the database.

## Use it as a template

Press **Use this template** at the top of this page, then **Create a new repository**, to get your own copy with a
clean history. Clone it and run it as above:

```sh
git clone https://github.com/<you>/<your-repository>.git
cd <your-repository>
```

You can also fork it to contribute back, or start from it with `git clone https://github.com/protobase-community/erp.git`.

## Customise it

- **Tables and screens.** Each table's data config is in `config/<name>/data.ts` (fields, validation, who may read
  and change what) and its screens in `config/<name>/ui.ts` (lists, filters, record pages), all exported from
  `config/index.ts`. See the [data config](https://docs.protobase.net/reference/data-config/) and [UI config](https://docs.protobase.net/reference/ui-config/)
  references.
- **Database changes.** Add a migration in `db/migrations/`, numbered after the last one, and run
  `bun run db:migrate`. Never edit a migration that has run. For a new table, `bun run protobase scaffold
  <connection string> --ui` reads the database and writes its `data.ts` and `ui.ts`, which you then adjust.
- **Sign-in and accounts** are in `auth/`, on Better Auth ([Login](https://docs.protobase.net/reference/auth/)).
- **Coding agents.** [AGENTS.md](AGENTS.md) holds the rules an assistant follows when it changes the app, and
  `bun run protobase skill install` gives it Protobase's own skill.
- Check every change with `bun run typecheck`, `bun run test` and `bun run build`, and after a migration with
  `bun run db:migrate` and `bun run db:doctor` (`protobase doctor`: a list, filter or sort without an index to serve
  it), as CI does.

- **Roles.** The 8 roles and what each may do are in `config/roles.ts`; the `costs` area gates the cost columns.
  See [Access](https://docs.protobase.net/reference/access/).
- **Pages and jobs.** The sales overview is `config/overview/`, the overdue invoice jobs `jobs/` with the write hook
  that enqueues them `hooks/` ([Jobs](https://docs.protobase.net/reference/jobs/)), and the warehouse's phone bar
  `config/bottom-bar.ts`.

## Host it on Protobase Cloud

[Protobase Cloud](https://protobase.net/cloud/) hosts the app and keeps Protobase up to date: sign up, start from the
ERP or from your own copy on GitHub, and every push to its branch deploys. A deploy installs, builds, runs `db:migrate`
and `protobase doctor`, and keeps the previous version serving when any of them fails, but runs neither the typecheck
nor the tests: run the checks above before you push. A new app starts from `db:seed:base`, without the sample data.
`bun run protobase skill install protobase-cloud` gives a coding agent the details: how to see whether a push went
live, and why a deploy failed.

## Built with Protobase

[Protobase](https://github.com/PrototeamHQ/protobase) builds the app from a Postgres database and a typed config: each table's data config sits in
`config/<name>/data.ts` and its screens in `config/<name>/ui.ts`, all exported from `config/index.ts`, and
`protobase dev` and `protobase serve` serve the API and the app from them.

- Tested with Protobase **0.50.1**: the `@protobase/*` packages are dev dependencies at its caret range in `package.json`,
  so the app is bundled: dev, the build and the `db:*` scripts (through `protobase run`) use the CLI's own copies, and
  `protobase types` points the typecheck at them. A newer CLI within that range updates the app with no change to its
  files. A GitHub Action (`.github/workflows/protobase-bump.yml`) moves the range when a new release comes out and
  merges the change once CI passes. The [release notes](https://github.com/PrototeamHQ/protobase/releases) say what changed.
  <gap>The bump pull request cannot merge itself because picking the dispatched CI run in the shared merge step is not implemented.</gap>
- Docs: [docs.protobase.net](https://docs.protobase.net). Source and issues: [PrototeamHQ/protobase](https://github.com/PrototeamHQ/protobase).
- This app started as an example in Protobase's repository; its history came with it.
- The same app is the `erp` preset that new Protobase apps can start from ([`@protobase/presets`](https://github.com/PrototeamHQ/protobase/tree/main/packages/presets)).

## Database

Other scripts: `db:seed:base` (the countries, the currencies and organization 1, named with `--name`, in the country and currency of `--country` and `--currency`, the Netherlands and euros otherwise: what an app made from the ERP preset starts with), `db:doctor` (`protobase doctor` against the database), `db:reset` (drop, migrate, seed small), `typecheck`. `bun run db:down` stops the container; the `pgdata` volume stays, remove it with `docker compose down -v`. The database tests run in [Protobase's repository](https://github.com/PrototeamHQ/protobase) (`bun run test:integration`).

Connection string (port 55433 avoids a local Postgres on 5432 and the other Protobase templates, which take 55432, 55434 and 55435, so they run side by side):

```
postgres://protobase:protobase@localhost:55433/protobase
```

Scripts read `DATABASE_URL` from the environment or from the git-ignored `.env` next to `package.json` (a copy of `.env.example`), and fall back to the string above.

## Tables

| Schema | Tables |
| --- | --- |
| `core` | `organizations`, `users`, `countries` (key: ISO code), `currencies` |
| `crm` | `companies` (trigram index on `name`; address with an optional postal code and region), `people` (the family name is optional), `tags`, `company_tags` (join table with `added_by`, `added_at`) |
| `catalog` | `categories` (`parent_id` tree with `position`), `products` (bigint identity, `jsonb attributes`, soft delete via `deleted_at`) |
| `sales` | `orders` (uuid v7 key), `order_lines` (key `(order_id, line_no)`), `invoices` (enum `invoice_status`), `invoice_lines` (`position`, generated `line_total`) |
| `inventory` | `warehouses`, `locations` (`ltree path`), `stock_moves` (append-only, no `updated_at`), `stock_levels` (derived from the moves) |
| `hr` | `"EMP_MASTER"` (legacy, uppercase columns), shown as Employees |

Every table has `organization_id` except `countries` (every ISO 3166 country), `currencies` (those in use, with their minor units) and `organizations` itself. The seed creates two organizations (70/30 split of the volumes) so tenant isolation can be tested. Each sells in its own currency: invoice tax is rounded to it, whole yen in Japan.

Seed consistency: an invoice's subtotal equals the sum of its lines and an order's total equals the sum of its lines; `stock_levels` equals the sum of `stock_moves` per product and location and never goes negative. Invoices exist for shipped and delivered orders.

## Sample data

Every name, address and number is made up; phone numbers use the ranges kept for fiction where a country has them
(555-01xx in the US, Ofcom's drama numbers in the UK). Per country, `seed/data/locales/` holds company and person
names, cities with their postal code patterns and regions, street address order, phone and tax number formats, the VAT
or GST rate and a delivery note in the language:

- Latin with diacritics and special letters: the Netherlands, Germany, the UK, Ireland (O'Sullivan, Ó Ceallaigh),
  France (Lebœuf), Poland (Łódź), Iceland (patronymics such as Einarsdóttir, þ and ð), Turkey (İ and ı), Vietnam,
  Indonesia (people with one name), Nigeria (Yoruba tone marks), Brazil, Mexico (two family names) and the US.
- Greek, Cyrillic (Russia), Arabic (the United Arab Emirates, which have no postal codes) and Hebrew, both right to
  left; Japanese, Chinese and Korean; Devanagari (India) and Thai; Singapore's Chinese, Malay and Tamil names.
- Emoji in tags and order notes, and the Japanese organization's catalog, warehouses and staff in Japanese.

`seed/locales.test.ts` checks that every script is there, that the text is composed (NFC) and that every sample passes
the app's own field checks; `config/international.test.ts` checks that those checks take names, addresses, phone
numbers and tax rates as other countries write them.

## Scales

| Scale | Companies | Orders | Stock moves | Products | Seed time (Apple silicon, local Docker) |
| --- | --- | --- | --- | --- | --- |
| small | 200 | 2,000 | 20,000 | 200 | about 1 s |
| medium | 20,000 | 200,000 | 1,000,000 | 2,000 | about 50 s (700 MB) |
| large | 20,000 | 200,000 | 10,000,000 | 2,000 | not timed since foreign keys are checked (2.8 GB) |

`db:seed` truncates everything first, so it can be re-run or used to switch scale. The loader streams `COPY`, drops secondary indexes during the load and rebuilds them afterwards, switches the tables' own triggers off while it writes the totals they compute, then resets identity sequences and runs `ANALYZE` so `pg_stats` is populated. Foreign keys are checked throughout: the role an app gets may not skip them. The scale last seeded is recorded in `public.seed_info`.

## Layout

- `db/migrations/NNN_name.sql`: plain SQL, applied in order and recorded in `public.schema_migrations` by `db/migrate.ts`.
- `seed/`: `world.ts` allocates ids per organization, `builders/` rebuild a company, product or order from its ordinal alone, `steps/` stream one module each. `base.ts` is the base seed.
- `AGENTS.md`: the rules for the assistant that changes an app made from this example, which is also the ERP preset ([`packages/presets`](https://github.com/PrototeamHQ/protobase/tree/main/packages/presets); the preset leaves this README out).
- `tests/postgres/erp-seed.test.ts` in [Protobase's repository](https://github.com/PrototeamHQ/protobase) (in the Postgres suite): checks the medium seed's counts, invoice totals, stock levels, composite keys and `pg_stats`.

## Login

`bun run db:migrate` also creates Better Auth's tables in the `auth` schema of the ERP database (`db/migrations/009_auth.sql`; later ones come from `protobase migration`); `bun run serve` (or `protobase dev`) then needs `PROTOBASE_SECRET` in `.env` and serves real sign-in. See [Login with Better Auth](https://docs.protobase.net/reference/auth/). There is no passwordless mode: create the first admin with `protobase users create <email>`, and mint a bearer token for curl with `protobase token <email>`.

The ERP has [organizations](https://docs.protobase.net/reference/auth/#organizations) on (`protobase.config.ts`): the seed writes its organizations to the auth schema too, under the ids its records use, and the first user owns them. Everyone else joins one with an organization role and app roles, by invitation in the app or on the host:

```sh
protobase users create amara@example.com --organization meridian --org-role admin --app-roles manager
protobase organizations add-member seiran amara@example.com --app-roles sales
protobase organizations list
```

A new organization takes the next id of `core.organizations` and gets its row there (`onOrganizationCreated` in `auth/hooks.ts`). A new user takes the next id of `core.users` (`generateUserId`), which orders name as their owner, and gets their row there when they first join an organization (`db/migrations/019_auth_users.sql`), so `sales` sees and changes the orders they own; the ERP's own `role` column stays empty for them, since their roles live in the auth schema.

## Serve and deploy

The ERP has no server of its own: `protobase.config.ts` describes the app, Protobase finds its code by path (`config/`, `auth/hooks.ts`, `jobs/`, `hooks/`, `functions/`) and serves it.

```sh
bun run serve    # protobase build, then protobase serve dist on port 8787 (PORT): the UI and the API, from source
```

For a deployment, ship the bundle folder: the host serves its `public/` and runs its config module with the serve runtime under Bun:

```sh
bun run build    # dist/: the config module, the app and protobase.ui.tsx as a plugin in public/, and protobase.bundle.json
bun run protobase build-serve    # protobase-serve.js, the runtime
bun --no-install /opt/protobase/protobase-serve.js /app/protobase.config.js
```

The host passes `DATABASE_URL`, `PORT`, `REQUEST_LOG` (`true` logs every request), and for password reset `PROTOBASE_SMTP_URL` and `PROTOBASE_MAIL_FROM`; the ERP itself reads `PROTOBASE_SECRET`, `PROTOBASE_URL`, and `PROTOBASE_TRUSTED_ORIGINS`. Run `db:migrate` against the database before the first start. The bundle's shape and the runtime's lifecycle are in the [CLI reference](https://docs.protobase.net/reference/cli/#build).

## Contributing

Contributions are welcome, from a typo to a new screen: see [CONTRIBUTING.md](CONTRIBUTING.md). A problem in Protobase
itself goes to [Protobase's issues](https://github.com/PrototeamHQ/protobase/issues).

## Licence

[Apache License 2.0](LICENSE).
