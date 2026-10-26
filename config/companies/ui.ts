import { l, view } from '@protobase/schema'
import type { companies } from './data'

export const companiesView = view<typeof companies>('companies')
  .title((r) => r.name)
  .names({ singular: 'Company', plural: 'Companies' })
  .fields((r) => ({
    name: r.name.help('The registered name, as it should appear on invoices.'),
    status: r.status.help('Leads have not ordered yet; dormant companies have not ordered in a year.').format('badge').valueLabels({ lead: 'Lead', active: 'Active', dormant: 'Dormant' }),
    country_code: r.country_code.label('Country'),
    vat_number: r.vat_number.label('Tax number').help('The VAT, GST or company tax number, as the country writes it.').format('code'),
    postal_code: r.postal_code.label('Postal code').help('Leave empty where the country has none, as in the United Arab Emirates.'),
    region: r.region.label('State or region').help('A state, province or prefecture, where addresses name one.'),
    created_at: r.created_at.label('Created').format('absolute'),
  }))
  .list((r) => ({
    columns: [r.name, r.city, r.country_code, r.status, r.email, r.phone, r.created_at],
    search: [r.name],
  }))
  .filters((r, w) => [w.facets(r.status), w.facets(r.country_code)])
  .layout((r) => [
    l.section('Company', [r.name, r.status, r.vat_number], { help: 'Legal details used on quotes and invoices.' }),
    l.section('Address', [r.street, r.postal_code, r.city, r.region, r.country_code], { help: 'As the post in the company’s country writes it.' }),
    l.section('Contact', [r.email, r.phone], { help: 'General contact details. People at the company are listed separately.' }),
  ])
