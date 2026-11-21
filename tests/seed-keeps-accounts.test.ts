import { execFileSync } from 'node:child_process'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { connect } from '../db/connection'

// Against the migrated database of DATABASE_URL, whose app tables it replaces, as `db:seed` does (`bun run test:db`).
const protobase = (args: string[], input?: string) => execFileSync('npx', ['protobase', ...args], { input, encoding: 'utf8' })
const seed = () => protobase(['run', 'seed/cli.ts'])

// One account, kept between runs: the first account of a new store owns the seeded organizations and is the last
// admin, whom nobody may delete.
const email = 'seed-test@example.com'
const sql = connect({ max: 1 })

const accountId = async () => (await sql<{ id: number }[]>`select id::integer from auth."user" where email = ${email}`)[0]?.id

beforeAll(async () => {
  seed()
  if (!(await accountId())) protobase(['users', 'create', email, '--password-stdin'], 'seed-test-password-1234')
  const [member] = await sql`select from auth.member where user_id = ${String(await accountId())} and organization_id = '1'`
  if (!member) protobase(['organizations', 'add-member', '1', email])
}, 120_000)

afterAll(async () => {
  await sql.end()
})

describe('db:seed', () => {
  it('keeps the users of the sign-in accounts, so they can still write', async () => {
    const id = (await accountId())!
    await sql`update core.users set name = 'Renamed' where id = ${id}`

    seed()

    const [kept] = await sql`select organization_id, email, name from core.users where id = ${id}`
    expect(kept).toEqual({ organization_id: 1, email, name: 'Renamed' })
    const [seeded] = await sql<{ first: number }[]>`select min(id) as first from core.users where email like '%.example'`
    expect(seeded!.first).toBeGreaterThan(id)
    const [company] = await sql<{ id: string }[]>`select id from crm.companies where organization_id = 1 limit 1`
    await sql`
      insert into sales.orders (organization_id, number, company_id, owner_id, status, currency_code)
      values (1, ${`TEST-${id}`}, ${company!.id}, ${id}, 'draft', 'EUR')
    `
  }, 120_000)

  it('gives an account whose user an earlier seed took its user again, from its membership', async () => {
    const id = (await accountId())!
    await sql`delete from sales.orders where owner_id = ${id}`
    await sql`delete from core.users where id = ${id}`

    seed()

    const [restored] = await sql`select organization_id, email from core.users where id = ${id}`
    expect(restored).toEqual({ organization_id: 1, email })
  }, 120_000)
})
