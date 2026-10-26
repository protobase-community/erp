import type { Db } from '../../db/connection'
import { DAY, windowEnd } from '../calendar'
import { copyRows } from '../copy'
import { native, personOf } from '../data/locale'
import { locales } from '../data/names'
import { isoDate, money, row } from '../format'
import { int, pick, rngAt } from '../rng'
import { employeesPerOrg, type World } from '../world'

const departments = ['SAL', 'FIN', 'WHS', 'ADM', 'PUR']
const managers = 3

// The legacy payroll import writes names as FAMILY, GIVEN in capitals, by the language's own rules (Turkish İ); a
// script without capitals keeps its own order, family name first (山田 太郎), and someone with one name has only it.
const payrollName = (given: string, family: string | null, language: string) => {
  if (family === null) return given.toLocaleUpperCase(language)
  const upper = `${family}, ${given}`.toLocaleUpperCase(language)
  return upper === `${family}, ${given}` ? `${family} ${given}` : upper
}

function* employeeRows(world: World) {
  for (const org of world.orgs) {
    const locale = locales[org.staff]
    for (let k = 0; k < employeesPerOrg; k++) {
      const rand = rngAt(org.seed + 8, k)
      const { given, family } = personOf(locale, rand)
      const name = payrollName(native(given), family === null ? null : native(family), locale.language)
      const managerId = k < managers ? null : org.employeeFirstId + int(rand, 0, managers - 1)
      const hired = windowEnd - int(rand, 30, 15 * 365) * DAY
      // A yearly salary in hundreds of the currency.
      const [low, high] = org.salary
      yield row(org.employeeFirstId + k, org.id, name, pick(rand, departments), isoDate(hired), money(int(rand, low / 100, high / 100) * 10_000), managerId, rand() < 0.92 ? 'Y' : 'N')
    }
  }
}

export const seedHr = (sql: Db, world: World) =>
  copyRows(sql, 'hr."EMP_MASTER" ("EMP_ID", "ORGANIZATION_ID", "EMP_NAME", "DEPT_CD", "HIRE_DT", "SAL_AMT", "MGR_ID", "ACTIVE_FLG")', employeeRows(world))
