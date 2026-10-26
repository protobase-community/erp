import { describe, expect, it } from 'vitest'
import { companies, people } from '../config'
import { companyIn, personIn } from './builders/company'
import { tree } from './data/catalogTree'
import { locales, type LocaleCode } from './data/names'
import { orgSpecs, tagNames } from './data/reference'
import { rngAt } from './rng'

type Check = { safeParse: (value: unknown) => { success: boolean } }
const shapeOf = (resource: { recordSchema: () => unknown }) => (resource.recordSchema() as { shape: Record<string, Check> }).shape

const samples = (Object.keys(locales) as LocaleCode[]).flatMap((code) =>
  Array.from({ length: 40 }, (_, index) => {
    const rand = rngAt(7, index + 1000 * Object.keys(locales).indexOf(code))
    const company = companyIn(code, rand)
    return { code, company, person: personIn(locales[code], company.domain, rand) }
  }),
)

const texts = [
  ...samples.flatMap(({ company, person }) => [company.name, company.street, company.city, company.region, person.first, person.last]),
  ...Object.values(locales).map((locale) => locale.note),
  ...tagNames.map(([name]) => name),
  ...orgSpecs.flatMap((org) => [org.name, ...org.users.map(([name]) => name), ...org.warehouses.map(([, name, city]) => `${name} ${city}`)]),
  ...tree.flatMap((root) => [root.ja, ...root.children.flatMap((child) => child.items.map(([, , ja]) => ja))]),
].filter((text): text is string => text !== null)

describe('the seed’s locales', () => {
  it('write every script the app should handle', () => {
    const all = texts.join('\n')
    const scripts = {
      'Latin with diacritics': /[À-ɏḀ-ỿ]/u, Cyrillic: /\p{Script=Cyrillic}/u, Greek: /\p{Script=Greek}/u, Arabic: /\p{Script=Arabic}/u,
      Hebrew: /\p{Script=Hebrew}/u, Han: /\p{Script=Han}/u, Kana: /\p{Script=Hiragana}|\p{Script=Katakana}/u, Hangul: /\p{Script=Hangul}/u,
      Devanagari: /\p{Script=Devanagari}/u, Thai: /\p{Script=Thai}/u, emoji: /\p{Extended_Pictographic}/u,
    }
    for (const [script, pattern] of Object.entries(scripts)) expect(pattern.test(all), script).toBe(true)
  })

  it('store text composed (NFC), as browsers send it', () => {
    for (const text of texts) expect(text, text).toBe(text.normalize('NFC'))
  })

  it('give every company and person an ASCII email address', () => {
    for (const { company, person } of samples) {
      expect(company.email).toMatch(/^info@[a-z0-9-]+\.[a-z.]+$/)
      expect(person.email).toMatch(/^[a-z0-9-]+(\.[a-z0-9-]+)?@[a-z0-9-]+\.[a-z.]+$/)
    }
  })

  it('pass the checks of the companies and people the app accepts', () => {
    const companyShape = shapeOf(companies)
    const personShape = shapeOf(people)
    for (const { company, person } of samples) {
      const companyRecord = { name: company.name, street: company.street, postal_code: company.postalCode, city: company.city, region: company.region, vat_number: company.vatNumber, email: company.email, phone: company.phone }
      const personRecord = { first_name: person.first, last_name: person.last, email: person.email, phone: person.phone, job_title: person.title }
      for (const [field, value] of Object.entries(companyRecord)) expect(companyShape[field]!.safeParse(value).success, `${company.name} ${field}`).toBe(true)
      for (const [field, value] of Object.entries(personRecord)) expect(personShape[field]!.safeParse(value).success, `${person.first} ${field}`).toBe(true)
    }
  })

  it('cover names without a family name and countries without postal codes', () => {
    expect(samples.some(({ person }) => person.last === null)).toBe(true)
    expect(samples.filter(({ code }) => code === 'AE').every(({ company }) => company.postalCode === null)).toBe(true)
  })

  it('keep tax rates within the invoices’ numeric(4, 2)', () => {
    for (const locale of Object.values(locales)) expect(locale.vatRate >= 0 && locale.vatRate < 100).toBe(true)
  })
})
