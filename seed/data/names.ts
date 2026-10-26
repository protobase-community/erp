import type { Locale } from './locale'
import { BR, MX, US } from './locales/americas'
import { CN, ID, IN, JP, KR, SG, TH, VN } from './locales/asia'
import { DE, FR, GB, GR, IE, IS, NL, PL, RU, TR } from './locales/europe'
import { AE, IL, NG } from './locales/middle-east-africa'

/** The countries customers and staff come from, keyed by their ISO code. */
export const locales = { NL, DE, GB, IE, FR, PL, IS, GR, RU, TR, AE, IL, NG, JP, CN, KR, TH, IN, VN, ID, SG, BR, MX, US } satisfies Record<string, Locale>

export type LocaleCode = keyof typeof locales

export const jobTitles = ['Purchasing manager', 'Buyer', 'Operations manager', 'Warehouse lead', 'Finance controller', 'Owner', 'Procurement specialist', 'Logistics coordinator', 'Maintenance engineer', 'Office manager']
