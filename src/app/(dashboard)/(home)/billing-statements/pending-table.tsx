'use client'

import getBillingStatements from '@/queries/get-billing-statements'
import { createBrowserClient } from '@/utils/supabase'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import DataTable from './data-table'
import billingStatementsColumns from './billing-statements-columns'

const PendingTable = () => {
  const supabase = createBrowserClient()
  const { data } = useQuery(getBillingStatements(supabase))

  return <DataTable columns={billingStatementsColumns} data={data as any} />
}
export default PendingTable
