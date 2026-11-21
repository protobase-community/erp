import { describe, expect, it } from 'vitest'
import { orgSpecs } from './data/reference'
import { buildWorld } from './world'

describe('buildWorld', () => {
  it('numbers the users from the first id it is given, one after another', () => {
    const ids = buildWorld('small', 17).orgs.flatMap((org) => org.users.map((user) => user.id))
    const count = orgSpecs.reduce((sum, spec) => sum + spec.users.length, 0)
    expect(ids).toEqual(Array.from({ length: count }, (_, index) => 17 + index))
  })
})
