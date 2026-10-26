const escapes: Record<string, string> = { '\\': '\\\\', '\t': '\\t', '\n': '\\n', '\r': '\\r' }

const cell = (value: unknown) => {
  if (value === null || value === undefined) return '\\N'
  return String(value).replace(/[\\\t\n\r]/g, (char) => escapes[char]!)
}

// One COPY text-format row.
export const row = (...values: unknown[]) => values.map(cell).join('\t') + '\n'

/** Rounded to a whole number of `step` cents: 100 for a currency without a minor unit, such as the yen. */
export const roundTo = (cents: number, step: number) => Math.round(cents / step) * step

export const money = (cents: number) => `${Math.floor(cents / 100)}.${String(cents % 100).padStart(2, '0')}`

export const iso = (ms: number) => new Date(ms).toISOString()

export const isoDate = (ms: number) => iso(ms).slice(0, 10)

// Latin letters that are not a base letter plus accents, so NFD alone would drop them: Þórunn is thorunn, not orunn.
const letters: Record<string, string> = { ß: 'ss', þ: 'th', ð: 'd', æ: 'ae', ø: 'o', œ: 'oe', ł: 'l', đ: 'd', ı: 'i' }

/** Lowercase, with Latin letters as their ASCII base letters: Łódź is lodz. Other scripts stay as they are. */
export const unaccent = (text: string) =>
  text
    .toLowerCase()
    .replace(/[ßþðæøœłđı]/g, (char) => letters[char]!)
    .normalize('NFD')
    .replace(/\p{M}/gu, '')

// Lowercase ASCII words joined by dashes, for addresses and slugs. Only Latin script survives: other scripts need a
// romanised form of their own (`latin` in data/locale.ts).
export const slugify = (text: string) =>
  unaccent(text)
    .replace(/['’]/g, '')
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
