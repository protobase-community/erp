import { view } from '@protobase/schema'
import type { people } from './data'

export const peopleView = view<typeof people>('people')
  .names({ singular: 'Person', plural: 'People' })
  .fields((r) => ({
    first_name: r.first_name.label('Given name'),
    last_name: r.last_name.label('Family name').help('Leave empty for someone with one name.'),
  }))
  .list((r) => ({ columns: [r.first_name, r.last_name, r.email, r.phone, r.job_title] }))
