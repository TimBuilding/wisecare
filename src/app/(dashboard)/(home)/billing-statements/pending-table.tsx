'use client'

import getPendingAccounts from '@/queries/get-pending-accounts'
import { createBrowserClient } from '@/utils/supabase'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import DataTable from './data-table'
import pendingColumns from './pending-columns'

const PendingTable = () => {
  const supabase = createBrowserClient()
  const { data } = useQuery(getPendingAccounts(supabase))

  return <DataTable columns={pendingColumns} data={data as any} />
}
export default PendingTable
