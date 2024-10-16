'use client'

import { useTableContext } from '@/providers/TableProvider'
import getAccounts from '@/queries/get-accounts'
import getPagination from '@/utils/pagination'
import { createBrowserClient } from '@/utils/supabase'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import { FC } from 'react'
import DataTable from './data-table'
import accountsColumns from '@/app/(dashboard)/(home)/accounts/columns/accounts-columns'

interface AccountsTableProps {
  count: number
}

const AccountsTable: FC<AccountsTableProps> = ({ count }) => {
  const { filter, pagination } = useTableContext()
  const supabase = createBrowserClient()

  // pagination
  const { to, from } = getPagination(pagination.pageIndex, pagination.pageSize)

  const { data } = useQuery(getAccounts(supabase, filter, from, to))

  return (
    // @ts-ignore
    <DataTable
      count={count}
      columns={accountsColumns}
      data={(data as any) || []}
    />
  )
}
export default AccountsTable
