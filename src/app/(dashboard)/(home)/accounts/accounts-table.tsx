'use client'

import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import DataTable from './data-table'
import marketingColumns, {
  getAccountsResponse,
} from './columns/marketing-columns'
import getAccounts from '@/queries/get-accounts'
import { createBrowserClient } from '@/utils/supabase'
import useUser from '@/hooks/useUser'
import underWritingColumns from './columns/under-writing-columns'
import { ColumnDef } from '@tanstack/react-table'
import financeColumns from './columns/finance-columns'
import afterSalesColumns from './columns/after-sales-columns'
import { useTableContext } from '@/providers/TableProvider'
import getPagination from '@/utils/pagination'
import { FC } from 'react'

interface AccountsTableProps {
  count: number
}

const AccountsTable: FC<AccountsTableProps> = ({ count }) => {
  const { filter, pagination } = useTableContext()
  const supabase = createBrowserClient()

  // pagination
  const { to, from } = getPagination(pagination.pageIndex, pagination.pageSize)

  const { data } = useQuery(getAccounts(supabase, filter, from, to))

  const { data: user } = useUser()
  let columns: ColumnDef<getAccountsResponse>[]
  switch (user?.departments.name) {
    case 'admin':
      columns = marketingColumns
      break
    case 'marketing':
      columns = marketingColumns
      break
    case 'finance':
      columns = financeColumns
      break
    case 'under-writing':
      columns = underWritingColumns
      break
    case 'after-sales':
      columns = afterSalesColumns
      break
    default:
      columns = [] // Default to an empty array if no role matches
      break
  }

  return (
    // @ts-ignore
    <DataTable count={count} columns={columns} data={(data as any) || []} />
  )
}
export default AccountsTable
