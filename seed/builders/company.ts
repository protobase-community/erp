import { DAY, windowEnd, windowStart } from '../calendar'
import { fill, latin, native, personOf, type Locale } from '../data/locale'
import { jobTitles, locales, type LocaleCode } from '../data/names'
import { int, pick, rngAt, weighted, type Rand } from '../rng'
import type { Org } from '../world'

const legacyShare = 0.6

export const legacyCompanies = (org: Org) => Math.floor(org.companyCount * legacyShare)

/** A made-up company of the country, as its own paperwork would write it. */
export const companyIn = (country: LocaleCode, rand: Rand) => {
  const locale = locales[country]
  const [city, postal, region] = pick(rand, locale.cities)
  const noun = pick(rand, locale.nouns)
  const brand = rand() < 0.7 ? pick(rand, locale.stems) : (personOf(locale, rand).family ?? pick(rand, locale.stems))
  const domain = `${`${latin(brand)}-${latin(noun)}`.slice(0, 40).replace(/-$/, '')}.${locale.tld}`
  return {
    name: locale.company(native(brand), native(noun), native(city), rand),
    country,
    street: locale.address(pick(rand, locale.streets), int(rand, 1, 240)),
    postalCode: postal === null ? null : fill(postal, rand),
    city: native(city),
    region,
    domain,
    vatNumber: fill(locale.vat, rand),
    email: `info@${domain}`,
    phone: fill(locale.phone, rand),
  }
}

/** A made-up person of the locale working at `domain`; `family` is null for someone with one name. */
export const personIn = (locale: Locale, domain: string, rand: Rand) => {
  const { given, family } = personOf(locale, rand)
  return {
    first: native(given),
    last: family === null ? null : native(family),
    email: `${[given, family].filter((part) => part !== null).map(latin).join('.')}@${domain}`,
    phone: rand() < 0.6 ? fill(locale.mobile, rand) : null,
    title: pick(rand, jobTitles),
  }
}

// Companies are ordered by creation time: the first 60% predate the window.
export const companyAt = (org: Org, ordinal: number) => {
  const rand = rngAt(org.seed + 1, ordinal)
  const legacy = legacyCompanies(org)
  const createdAt =
    ordinal < legacy
      ? Math.floor(windowStart - (1 - ordinal / legacy) * 3 * 365 * DAY)
      : Math.floor(windowStart + ((ordinal - legacy) / (org.companyCount - legacy)) * (windowEnd - windowStart))
  return {
    id: org.companyFirstId + ordinal,
    ...companyIn(weighted(rand, org.locales), rand),
    status: weighted(rand, [['active', 85], ['dormant', 10], ['lead', 5]] as const),
    createdAt,
  }
}

export const peopleOf = (org: Org, ordinal: number) => org.personStarts[ordinal + 1]! - org.personStarts[ordinal]!

export const personAt = (org: Org, company: ReturnType<typeof companyAt>, ordinal: number, slot: number) => {
  const rand = rngAt(org.seed + 4, org.personStarts[ordinal]! + slot)
  return {
    id: org.personFirstId + org.personStarts[ordinal]! + slot,
    ...personIn(locales[company.country], company.domain, rand),
    createdAt: company.createdAt + int(rand, 0, 20) * 3_600_000,
  }
}
