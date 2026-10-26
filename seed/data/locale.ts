import { slugify } from '../format'
import { pick, type Rand } from '../rng'

/** A name as it is written, with its romanised form when its script is not Latin: `['佐藤', 'sato']`. */
export type Word = string | readonly [native: string, latin: string]

export const native = (word: Word) => (typeof word === 'string' ? word : word[0])

/** The ASCII form for email addresses and domains. */
export const latin = (word: Word) => slugify(typeof word === 'string' ? word : word[1])

/** A city with its postal code pattern (`#` a digit, `@` a capital letter; null where there are none) and region. */
export type City = readonly [name: Word, postal: string | null, region: string | null]

export type Person = { given: Word; family: Word | null }

/**
 * The made-up businesses and people of one country, written as they are there: their script, word order, address and
 * phone formats, tax number and VAT or sales tax rate. Every name is invented; phone numbers fall in ranges kept for
 * fiction where a country has them.
 */
export type Locale = {
  /** BCP 47 tag for the language's casing rules: Turkish uppercases i as İ. */
  language: string
  stems: readonly Word[]
  nouns: readonly Word[]
  /** The company's registered name from its brand (a stem or a family name), trade and city. */
  company: (brand: string, noun: string, city: string, rand: Rand) => string
  tld: string
  cities: readonly City[]
  streets: readonly string[]
  address: (street: string, number: number) => string
  givenNames: readonly Word[]
  familyNames: readonly Word[]
  /** People with one name and no family name, as is common in Indonesia. */
  mononyms?: number
  /** Overrides the plain given and family name, for patronymics and mixed naming customs. */
  person?: (rand: Rand) => Person
  phone: string
  mobile: string
  vat: string
  /** The standard VAT, GST or consumption tax rate, in percent. */
  vatRate: number
  /** A delivery note in the language, as a customer would write it on an order. */
  note: string
}

/** Fills a pattern: each `#` becomes a digit and each `@` a capital letter. */
export const fill = (pattern: string, rand: Rand) =>
  pattern.replace(/[#@]/g, (char) => (char === '#' ? String(Math.floor(rand() * 10)) : String.fromCharCode(65 + Math.floor(rand() * 26))))

export const personOf = (locale: Locale, rand: Rand): Person => {
  if (locale.person) return locale.person(rand)
  const given = pick(rand, locale.givenNames)
  if (locale.mononyms && rand() < locale.mononyms) return { given, family: null }
  return { given, family: pick(rand, locale.familyNames) }
}
