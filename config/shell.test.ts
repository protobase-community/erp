import { createAdmin, configExports, defineJob } from '@protobase/server'
import { describe, expect, it } from 'vitest'
import * as config from './index'
import project from '../protobase.config'
import { roles } from './roles'

describe('ERP sidebar, user menu and bottom bar', () => {
  const { resources, views, pages, userMenu, bottomBars } = configExports(config)
  // The config's jobs, which give admins the failed jobs page; their runs are jobs/<name>.ts, which this test never runs.
  const jobs = Object.keys(project.jobs ?? {}).map((name) => defineJob({ name, run: () => {} }))

  it('has recent groups that fit their resources', () => {
    const grouped = views.map((view) => view.toModel()).filter((view) => view.nav?.recent)
    expect(grouped.map((view) => view.resource).sort()).toEqual(['invoices', 'orders'])
    // createAdmin refuses a group or a user menu entry that does not fit, before any request.
    expect(() => createAdmin({ resources, views, pages, userMenu, jobs, db: {} as never, authenticate: () => { throw new Error('No requests in this test') } })).not.toThrow()
  })

  it('moves the account pages into the user menu', () => {
    expect(userMenu?.toUserMenuModel().items.map((item) => (item.kind === 'resource' ? item.resource : item.kind === 'page' ? item.page : item.label))).toEqual(['organizations', 'accounts', 'failed_jobs', 'Documentation', 'Support'])
  })

  it('gives the warehouse role a bottom bar that fits the resources and roles', () => {
    expect(bottomBars.map((bar) => bar.toBottomBarModel())).toEqual([expect.objectContaining({ label: 'Warehouse', roles: ['warehouse'] })])
    expect(() => createAdmin({ resources, views, bottomBars, db: {} as never, authenticate: () => { throw new Error('No requests in this test') }, options: { roles } })).not.toThrow()
  })
})
