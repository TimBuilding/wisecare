'use client'
import employeesColumns from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(employees)/employees-columns'
import EmployeesDataTable from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(employees)/employees-data-table'
import getEmployeeByCompanyId from '@/queries/get-employee-by-company-id'
import { createBrowserClient } from '@/utils/supabase'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import { FC } from 'react'

interface EmployeesTabProps {
  companyId: string
}

const EmployeesTab: FC<EmployeesTabProps> = ({ companyId }) => {
  const supabase = createBrowserClient()
  const { data: employees } = useQuery(
    getEmployeeByCompanyId(supabase, companyId),
  )

  return (
    <EmployeesDataTable columns={employeesColumns} data={employees || []} />
  )
}

export default EmployeesTab
