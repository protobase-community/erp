import { describe, expect, it } from 'vitest'
import { companies, empMaster, invoices, people } from './index'

type Check = { safeParse: (value: unknown) => { success: boolean } }

// The fields of `record` the API refuses on a create or update, by each field's own check as the server runs it.
// recordSchema() is a Zod object of those checks.
const refused = (resource: { recordSchema: () => unknown }, record: Record<string, unknown>) => {
  const { shape } = resource.recordSchema() as { shape: Record<string, Check> }
  return Object.entries(record).filter(([name, value]) => !shape[name]!.safeParse(value).success).map(([name]) => name)
}

describe('international records', () => {
  it('take a person with one name and no family name', () => {
    expect(refused(people, { first_name: 'Sutrisno', last_name: null })).toEqual([])
    expect(refused(people, { first_name: 'Nur Aisyah binti Rahman', last_name: null })).toEqual([])
    expect(refused(people, { first_name: null })).toEqual(['first_name'])
  })

  it('take names, addresses and phone numbers as each country writes them', () => {
    const written = [
      { name: 'Adéyẹmí Industrial Supplies Ltd', street: '12 Adeola Odeku Street', postal_code: '101241', city: 'Lagos', region: 'Lagos State', phone: '+234 1 234 5678' },
      { name: 'شركة الواحة للتجارة ذ.م.م', street: 'شارع الشيخ زايد، مبنى 4', postal_code: null, city: 'دبي', region: null, phone: '+971 4 123 4567' },
      { name: 'אור הנדסה בע״מ', postal_code: '6100101', city: 'תל אביב-יפו', phone: '+972 3-123-4567' },
      { name: '株式会社若葉精機', street: '中央区本町2丁目14-7', postal_code: '541-0053', city: '大阪市', region: '大阪府', phone: '06-1234-5678' },
      { name: "O'Sullivan Engineering Ltd", postal_code: 'D02 X285', city: 'Dún Laoghaire', phone: '+353 (0)1 234 5678' },
      { name: 'Lone Star Tool & Die, Inc.', postal_code: '43215-1234', city: 'Columbus', region: 'OH', phone: '+1 (512) 555-0123 ext. 4' },
      { name: 'ООО «Байкал Логистик»', postal_code: '620014', city: 'Екатеринбург', vat_number: '6658123456' },
      { name: 'บริษัท สยามเทคนิค จำกัด', postal_code: '10110', city: 'กรุงเทพมหานคร', vat_number: '0105561234567' },
      { name: 'Café ☕ & Co 🚚', city: 'Reykjavík', postal_code: '101' },
    ]
    for (const company of written) expect(refused(companies, company), company.name).toEqual([])
  })

  it('take an employee name up to the 200 characters the payroll table holds', () => {
    const long = 'GARCÍA FERNÁNDEZ DE LA VEGA Y MARTÍNEZ DE LA PEÑA, MARÍA DE LOS ÁNGELES GUADALUPE DEL ROSARIO'
    expect(long.length).toBeGreaterThan(60)
    expect(refused(empMaster, { emp_name: long })).toEqual([])
    expect(refused(empMaster, { emp_name: 'ب'.repeat(200) })).toEqual([])
    expect(refused(empMaster, { emp_name: 'x'.repeat(201) })).toEqual(['emp_name'])
  })

  it('take every country’s tax rate, from none to fractions', () => {
    for (const rate of ['0', '5', '7.5', '10', '24']) expect(refused(invoices, { vat_rate: rate }), rate).toEqual([])
  })
})
