'use client'

import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import DataTable from './data-table'
import marketingColumns from './marketing-columns'
import getAccounts from '@/queries/get-accounts'
import { createBrowserClient } from '@/utils/supabase'

const AccountsTable = () => {
  const supabase = createBrowserClient()
  const { data } = useQuery(getAccounts(supabase))

  return <DataTable columns={marketingColumns} data={data as any} />
}
export default AccountsTable
