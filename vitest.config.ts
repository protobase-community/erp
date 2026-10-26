import { defineConfig } from 'vitest/config'

// The unit tests next to the config, the hooks and the seed; none of them needs a database.
export default defineConfig({ test: { include: ['config/**/*.test.ts', 'hooks/**/*.test.ts', 'seed/**/*.test.ts'] } })
