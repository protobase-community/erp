import { l, view } from '@protobase/schema'
import type { empMaster } from './data'

// Over the legacy payroll table, whose column names (EMP_NAME, DEPT_CD) the screens leave behind.
export const empMasterView = view<typeof empMaster>('emp_master')
  .title((r) => r.emp_name)
  .names({ singular: 'Employee', plural: 'Employees' })
  .fields((r) => ({
    emp_id: r.emp_id.label('Employee number'),
    emp_name: r.emp_name.label('Name').help('As the payroll import writes it: family name, then given name.'),
    dept_cd: r.dept_cd.label('Department').help('SAL sales, FIN finance, WHS warehouse, ADM administration, PUR purchasing.').format('code'),
    hire_dt: r.hire_dt.label('Hire date'),
    sal_amt: r.sal_amt.label('Annual salary').decimals(2),
    mgr_id: r.mgr_id.label('Manager'),
    active_flg: r.active_flg.label('Active').valueLabels({ Y: 'Yes', N: 'No' }),
  }))
  .list((r) => ({ columns: [r.emp_name, r.dept_cd, r.hire_dt, r.sal_amt, r.active_flg] }))
  .layout((r) => [
    l.section('Employee', [r.emp_name, r.emp_id, r.dept_cd, r.mgr_id, r.hire_dt]),
    l.section('Payroll', [r.sal_amt, r.active_flg], { help: 'Only admins see the salary.' }),
  ])
