import { DAY, windowStart } from '../calendar'
import { roundTo } from '../format'
import { int, pick, rngAt } from '../rng'
import type { Org } from '../world'
import { bases } from './categories'

const qualifiers = [
  ['', ''], ['Pro', 'プロ'], ['Eco', 'エコ'], ['Heavy duty', '重作業用'], ['Food grade', '食品グレード'], ['Marine', '船舶用'], ['Low profile', '薄型'],
  ['Extended', 'ロング'], ['Compact', 'コンパクト'], ['Industrial', '工業用'], ['Standard', '標準'], ['Premium', 'プレミアム'], ['Trade pack', '業務用パック'],
  ['Bulk', 'バルク'], ['Value', 'お徳用'], ['Light', '軽量'], ['Reinforced', '強化型'], ['EU spec', 'EU仕様'], ['UK spec', 'UK仕様'], ['Retrofit', '後付け用'],
] as const
const materials = ['steel', 'stainless steel', 'zinc plated steel', 'aluminium', 'nylon', 'rubber', 'polyethylene', 'cardboard', 'brass']
const origins = ['DE', 'PL', 'IT', 'CN', 'TR', 'JP', 'KR', 'IN', 'VN', 'MX', 'US']

const variantOf = (ordinal: number) => Math.floor(ordinal / bases.length) % qualifiers.length

export const productName = (org: Org, ordinal: number) => {
  const ja = org.catalog === 'ja'
  const base = bases[ordinal % bases.length]!.name[org.catalog]
  const qualifier = qualifiers[variantOf(ordinal)]![ja ? 1 : 0]
  const round = Math.floor(ordinal / (bases.length * qualifiers.length))
  const name = !qualifier ? base : ja ? `${base}（${qualifier}）` : `${base} - ${qualifier}`
  if (round === 0) return name
  return ja ? `${name} シリーズ${round + 1}` : `${name} (series ${round + 1})`
}

// In the organization's currency, from the catalog's euro prices: later qualifiers cost a little more.
export const productPriceCents = (org: Org, ordinal: number) =>
  Math.max(org.step, roundTo(bases[ordinal % bases.length]!.price * (1 + variantOf(ordinal) * 0.045) * org.rate, org.step))

export const productAt = (org: Org, ordinal: number) => {
  const rand = rngAt(org.seed + 2, ordinal)
  const base = bases[ordinal % bases.length]!
  const name = productName(org, ordinal)
  const createdAt = windowStart - 30 * DAY - Math.floor((1 - ordinal / org.productCount) * 3 * 365 * DAY)
  const deleted = ordinal % 37 === 36
  return {
    id: org.productFirstId + ordinal,
    categoryId: org.categoryFirstId + base.category,
    sku: `${base.code}-${String(ordinal + 1).padStart(5, '0')}`,
    name,
    description: rand() < 0.4 ? null : org.catalog === 'ja' ? `${name}。工場の保守・組立用に在庫しています。` : `${name}. Stocked for industrial maintenance and assembly.`,
    priceCents: productPriceCents(org, ordinal),
    attributes: {
      material: pick(rand, materials),
      weight_g: int(rand, 5, 8000),
      pack_size: pick(rand, [1, 10, 25, 50, 100, 250]),
      origin: pick(rand, origins),
      hazardous: rand() < 0.04,
    },
    deletedAt: deleted ? createdAt + int(rand, 30, 900) * DAY : null,
    createdAt,
  }
}
