import { DAY, windowEnd, within } from '../calendar'
import { currencies } from '../data/iso'
import { locales } from '../data/names'
import { roundTo } from '../format'
import { pick, rngAt } from '../rng'
import type { Org } from '../world'
import type { SeededOrder } from './order'

// Cents per smallest unit tax is rounded to, as sales.tax_decimals does: 100 for the yen, 1 for two decimals.
const taxStep = (currency: string) => 10 ** (2 - Math.min(2, currencies.find(([code]) => code === currency)![3]))

// Shipped and delivered orders are invoiced; the invoice id follows the order ordinal.
export const invoiceFor = (org: Org, ordinal: number, order: SeededOrder) => {
  if (order.status !== 'shipped' && order.status !== 'delivered') return null
  const rand = rngAt(org.seed + 9, ordinal)
  const issuedAt = within(order.createdAt, (1 + Math.floor(rand() * 3)) * DAY, rand)
  const dueAt = issuedAt + pick(rand, [14, 30, 30, 30, 60]) * DAY
  const vatRate = locales[order.company.country].vatRate
  const subtotalCents = order.totalCents
  const vatCents = roundTo((subtotalCents * vatRate) / 100, taxStep(org.currency))
  const recent = windowEnd - issuedAt < 2 * DAY
  return {
    id: org.orderFirstId + ordinal + 1,
    number: `INV-${new Date(issuedAt).getUTCFullYear()}-${String(ordinal + 1).padStart(6, '0')}`,
    status: order.paid ? 'paid' : dueAt < windowEnd ? 'overdue' : recent && rand() < 0.5 ? 'draft' : 'sent',
    issuedAt,
    dueAt,
    vatRate,
    subtotalCents,
    vatCents,
    totalCents: subtotalCents + vatCents,
    createdAt: issuedAt,
    updatedAt: within(issuedAt, Math.floor(rand() * 20 * DAY), rand),
  }
}
