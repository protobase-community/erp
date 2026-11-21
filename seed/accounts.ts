import type { JSONValue } from 'postgres'
import type { Db } from '../db/connection'

// A sign-in account is one of the ERP's users under the same id (db/migrations/019_auth_users.sql), and the seed
// replaces core.users. So it reads the accounts' rows before it truncates and writes them again after, and gives its
// own users the ids after the last account's, which no account holds and which the next account will not take.
export const readAccounts = async (sql: Db) => {
  const [found] = await sql<{ last: number; rows: JSONValue }[]>`
    select
      (select coalesce(max(id::integer), 0) from auth."user" where id ~ '^[0-9]+$') as last,
      (select coalesce(json_agg(u), '[]') from core.users u where u.id::text in (select id from auth."user")) as rows
  `
  return { firstUserId: found!.last + 1, rows: found!.rows }
}

// After the organizations are written. A kept row stays as it was; an account that has none, such as one whose row an
// earlier seed took, gets it as its first membership gives it (019_auth_users.sql). A row in an organization the seed
// did not write again, or whose address a seeded user of that organization took, is left out.
export const writeAccounts = async (sql: Db, rows: JSONValue) => {
  await sql`
    insert into core.users
    select * from jsonb_populate_recordset(null::core.users, ${sql.json(rows)})
    where organization_id in (select id from core.organizations)
    on conflict do nothing
  `
  await sql`
    insert into core.users (id, organization_id, email, name)
    select distinct on (u.id) u.id::integer, m.organization_id::integer, u.email, u.name
    from auth."user" u
    join auth.member m on m.user_id = u.id
    where u.id ~ '^[0-9]+$' and m.organization_id in (select id::text from core.organizations)
    order by u.id, m.created_at
    on conflict do nothing
  `
}
