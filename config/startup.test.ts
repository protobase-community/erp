import { fileURLToPath } from 'node:url'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import { configExports, createAdmin, defineJob, type JobDeclaration, type JobRun } from '@protobase/server'
import { loadProjectAuth } from '@protobase/cli/auth'
import project from '../protobase.config'
import scheduleOverdueCheck from '../hooks/schedule-overdue-check'
import * as config from './index'
import { roles } from './roles'

// The app's admin API built as `dev` and `serve` build it, with its own sign-in, jobs and write hook, so a startup check
// such as an owner field that must hold the user ids refuses here instead of on the app's first start. Building the API
// reaches no database.
describe('the app', () => {
  beforeAll(() => {
    vi.stubEnv('PROTOBASE_SECRET', 'a-secret-only-this-test-uses-0123456789')
    vi.stubEnv('PROTOBASE_URL', 'http://localhost:5173')
    vi.stubEnv('DATABASE_URL', 'postgres://nobody@127.0.0.1:1/none')
  })

  afterAll(() => {
    vi.unstubAllEnvs()
  })

  it('passes the startup checks with its own sign-in', async () => {
    const auth = await loadProjectAuth(fileURLToPath(new URL('..', import.meta.url)))
    // Each job the config declares, with its run from jobs/<name>.ts, as the app's workers have it.
    const jobs = await Promise.all(
      Object.entries<JobDeclaration>(project.jobs ?? {}).map(async ([name, { description: _, arguments: __, ...options }]) => {
        const run: JobRun = (await import(`../jobs/${name}.ts`)).default
        return defineJob<Record<string, unknown>>({ ...options, name, run: (payload, context) => run(payload ?? {}, context) })
      }),
    )
    const { resources, views, pages, userMenu, bottomBars, subscriptions } = configExports(config)
    expect(() =>
      createAdmin({
        resources,
        views,
        pages,
        ...(userMenu && { userMenu }),
        bottomBars,
        subscriptions,
        db: {} as never,
        auth,
        authenticate: () => { throw new Error('No requests in this test') },
        jobs,
        options: { roles, writeHooks: [scheduleOverdueCheck] },
      }),
    ).not.toThrow()
  }, 60_000)
})
