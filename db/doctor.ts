import { spawnSync } from 'node:child_process'
import { databaseUrl } from './connection'

// `protobase doctor` against the app's database, with the connection string the other db:* scripts use (the
// environment, `.env` or the default), so a read the API would refuse once deployed fails here first.
const doctor = spawnSync('protobase', ['doctor', '--env', 'DATABASE_URL'], {
  env: { ...process.env, DATABASE_URL: databaseUrl },
  stdio: 'inherit',
})
process.exit(doctor.status ?? 1)
