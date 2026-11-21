import { defineConfig } from 'vitest/config'

// The tests against a real, migrated Postgres (DATABASE_URL), whose app tables they replace: `bun run test:db`.
export default defineConfig({ test: { include: ['tests/**/*.test.ts'], fileParallelism: false } })
