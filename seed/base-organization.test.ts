import { describe, expect, it } from 'vitest'
import { baseOrganization } from './base-organization'

describe('baseOrganization', () => {
  it('is organization 1, named after the app, in the Netherlands and in euros', () => {
    expect(baseOrganization('Acme Supply')).toEqual({ id: 1, name: 'Acme Supply', slug: 'acme-supply', country_code: 'NL', currency_code: 'EUR' })
  })

  it('makes a slug of any name', () => {
    expect(baseOrganization('Müller & Söhne B.V.').slug).toBe('muller-sohne-b-v')
    expect(baseOrganization('!!!').slug).toBe('organization')
  })

  it('keeps a name in any script as it is written, with an ASCII slug', () => {
    expect(baseOrganization('  青嵐産業資材株式会社 ')).toMatchObject({ name: '青嵐産業資材株式会社', slug: 'organization' })
    expect(baseOrganization('Þór & Dóttir ehf.').slug).toBe('thor-dottir-ehf')
  })

  it('takes the country and currency it is given', () => {
    expect(baseOrganization('Acme', 'JP', 'JPY')).toMatchObject({ country_code: 'JP', currency_code: 'JPY' })
    expect(() => baseOrganization('Acme', 'XX')).toThrow('country')
    expect(() => baseOrganization('Acme', 'JP', 'YEN')).toThrow('currency')
  })

  it('refuses an empty name', () => {
    expect(() => baseOrganization('  ')).toThrow('name')
  })
})
