'use client'

import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import DataTable from './data-table'
import marketingColumns from './marketing-columns'
import getAccounts from '@/queries/get-accounts'
import { createBrowserClient } from '@/utils/supabase'

const AccountsTable = () => {
  const supabase = createBrowserClient()
  const { data, error } = useQuery(getAccounts(supabase))

  console.log(error?.message)
  console.log(data)
  return <DataTable columns={marketingColumns} data={data as any} />
}
export default AccountsTable
