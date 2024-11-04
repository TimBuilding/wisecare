import { useCompanyContext } from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(company profile)/company-provider'
import EmployeeRequestListItem from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(employees)/request/employee-request-list-item'
import getPendingCompanyEmployees from '@/queries/get-pending-company-employees'
import getPendingEmployeeByCompanyId from '@/queries/get-pending-employee-by-company-id'
import { createBrowserClient } from '@/utils/supabase'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'

const EmployeeRequestList = () => {
  const { accountId } = useCompanyContext()
  const supabase = createBrowserClient()

  const { data: pendingEmployees } = useQuery(
    getPendingEmployeeByCompanyId(supabase, accountId),
  )
  return (
    <div className="grid grid-cols-1 divide-y">
      {pendingEmployees?.map((pendingEmployee) => (
        <EmployeeRequestListItem
          key={pendingEmployee.id}
          data={pendingEmployee as any}
        />
      ))}
    </div>
  )
}

export default EmployeeRequestList
