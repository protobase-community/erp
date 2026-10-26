import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import { configExports, createAdmin, jobDefinitions, mergeConfig, type Authenticator } from '@protobase/server'

// The app's admin API built as `dev` and `serve` build it, with its own auth and jobs, so a startup check such as an
// owner field that must hold the user ids refuses here instead of on the app's first start. Building the API reaches
// no database. The config is imported once the environment is set, since the auth reads it.
describe('the app', () => {
  beforeAll(() => {
    vi.stubEnv('BETTER_AUTH_SECRET', 'a-secret-only-this-test-uses-0123456789')
    vi.stubEnv('DATABASE_URL', 'postgres://nobody@127.0.0.1:1/none')
  })

  afterAll(() => {
    vi.unstubAllEnvs()
  })

  it('passes the startup checks with its own auth', async () => {
    const project = mergeConfig((await import('../protobase.config')).default)
    expect(project.auth, 'the app signs in with Better Auth').toBeDefined()
    const { resources, views, pages, userMenu, bottomBars, subscriptions } = configExports(project.config ?? {})
    expect(() =>
      createAdmin({
        resources,
        views,
        pages,
        ...(userMenu && { userMenu }),
        bottomBars,
        subscriptions,
        db: {} as never,
        authenticate: project.authenticate as Authenticator,
        ...(project.auth && { auth: project.auth }),
        ...(project.events && { events: project.events }),
        ...(project.history && { history: project.history }),
        ...(project.notifications && { notifications: project.notifications }),
        jobs: jobDefinitions(project.jobs ?? {}),
        options: project.options,
      }),
    ).not.toThrow()
  }, 60_000)
})
