import { useCompanyContext } from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(company profile)/company-provider'
import { Button } from '@/components/ui/button'
import getEmployeeByCompanyId from '@/queries/get-employee-by-company-id'
import { createBrowserClient } from '@/utils/supabase'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import { FileDown } from 'lucide-react'
import * as XLSX from 'xlsx'

const ExportEmployees = () => {
  const { accountId } = useCompanyContext()

  const supabase = createBrowserClient()
  const { data: employees } = useQuery(
    getEmployeeByCompanyId(supabase, accountId),
  )

  const onExportEmployees = () => {
    if (!employees) return

    const employeesData = employees.map((employee) => {
      const { id, account_id, ...rest } = employee
      return rest
    })

    const fileName = `employees-${new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })}.xlsx`

    const worksheet = XLSX.utils.json_to_sheet(employeesData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
    XLSX.writeFile(workbook, fileName)
  }
  return (
    <Button className="gap-2" variant={'outline'} onClick={onExportEmployees}>
      <FileDown />
      <span>Export</span>
    </Button>
  )
}

export default ExportEmployees
