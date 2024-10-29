import { Button } from '@/components/ui/button'
import getAccounts from '@/queries/get-accounts'
import { createBrowserClient } from '@/utils/supabase'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import { FileDown } from 'lucide-react'
import * as XLSX from 'xlsx'

const ExportAccounts = () => {
  const supabase = createBrowserClient()
  const { data: accounts } = useQuery(getAccounts(supabase))

  const exportAccounts = () => {
    if (!accounts) return

    const accountsData = accounts.map((account) => ({
      ...account,
      agent: account.agent
        ? `${account.agent.first_name} ${account.agent.last_name}`
        : '',
      hmo_count: account.hmo_provider ? (account.hmo_provider as any).name : '',
      previous_hmo_provider: account.previous_hmo_provider
        ? (account.previous_hmo_provider as any).name
        : '',
      current_hmo_provider: account.current_hmo_provider
        ? (account.current_hmo_provider as any).name
        : '',
      account_type: account.account_type
        ? (account.account_type as any).name
        : '',
      principal_plan_type: account.principal_plan_type
        ? (account.principal_plan_type as any).name
        : '',
      dependent_plan_type: account.dependent_plan_type
        ? (account.dependent_plan_type as any).name
        : '',
      mode_of_payment: account.mode_of_payment
        ? (account.mode_of_payment as any).name
        : '',
    }))

    const fileName = `accounts-${new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })}.xlsx`

    const worksheet = XLSX.utils.json_to_sheet(accountsData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
    XLSX.writeFile(workbook, fileName)
  }

  return (
    <Button className="space-x-2" variant={'outline'} onClick={exportAccounts}>
      <FileDown />
      <span>Export</span>
    </Button>
  )
}

export default ExportAccounts
