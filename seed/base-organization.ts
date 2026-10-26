import { countries, currencies } from './data/iso'
import { unaccent } from './format'

// Lowercase ASCII words joined by dashes; diacritics are dropped, so Müller becomes muller and Þór thor.
const slugOf = (name: string) => unaccent(name).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'organization'

/** Organization 1, the one every user works in (auth/auth.ts), named after the app, in a country and a currency. */
export const baseOrganization = (name: string, country = 'NL', currency = 'EUR') => {
  const trimmed = name.trim()
  if (!trimmed) throw new Error('The organization needs a name: pass --name "<the app name>"')
  if (!countries.some(([code]) => code === country)) throw new Error(`Unknown country "${country}": pass --country with an ISO 3166 code, such as JP`)
  if (!currencies.some(([code]) => code === currency)) throw new Error(`Unknown currency "${currency}": pass --currency with an ISO 4217 code, such as JPY`)
  return { id: 1, name: trimmed, slug: slugOf(trimmed), country_code: country, currency_code: currency }
}
