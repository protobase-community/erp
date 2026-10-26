import { userMenu } from '@protobase/schema'

/**
 * Account pages under the signed-in user instead of in the sidebar, then help. `failed_jobs` is Protobase's page of
 * background tasks that gave up, such as the overdue invoice checks (`jobs/`): admins only, so others never see it.
 */
export const accountMenu = userMenu((m) => [
  m.resource('organizations', { label: 'Organization', icon: 'building' }),
  m.page('accounts', { label: 'Users', icon: 'users' }),
  m.resource('failed_jobs', { label: 'Background task errors', icon: 'shield' }),
  m.link('Documentation', 'https://docs.protobase.net', { icon: 'book-open' }),
  m.link('Support', 'mailto:support@example.com', { icon: 'life-buoy' }),
])
