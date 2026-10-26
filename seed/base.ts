import { connect } from '../db/connection'
import { seedAuthOrganizations } from './auth-organizations'
import { baseOrganization } from './base-organization'
import { countries, currencies } from './data/iso'

// `db:seed:base [--name <app name>] [--country <code>] [--currency <code>]`: what a new app starts with, the countries,
// the currencies and organization 1 (in the Netherlands and in euros unless told otherwise), in the ERP's tables and in
// the auth schema's. Rows already there stay as they are, so it can run again and after the sample seed (`db:seed`).
const option = (name: string) => {
  const flag = process.argv.indexOf(`--${name}`)
  return flag === -1 ? undefined : (process.argv[flag + 1] ?? '')
}
const organization = baseOrganization(option('name') ?? 'ERP', option('country')?.toUpperCase(), option('currency')?.toUpperCase())

const sql = connect({ max: 1 })
await sql.begin(async (tx) => {
  await tx`insert into core.countries ${tx(countries.map(([code, name, euMember]) => ({ code, name, eu_member: euMember })))} on conflict do nothing`
  await tx`insert into core.currencies ${tx(currencies.map(([code, name, symbol, decimals]) => ({ code, name, symbol, decimals })))} on conflict do nothing`
  await tx`insert into core.organizations ${tx(organization)} on conflict do nothing`
  // An explicit id leaves the identity sequence behind, so the next organization would take id 1 again.
  await tx`select setval(pg_get_serial_sequence('core.organizations', 'id'), (select max(id) from core.organizations))`
  await seedAuthOrganizations(tx, [organization])
})
await sql.end()
console.log(`seeded the base data of ${organization.name}`)
