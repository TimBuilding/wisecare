'use client'

import getBillingStatements from '@/queries/get-billing-statements'
import { createBrowserClient } from '@/utils/supabase'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import DataTable from './data-table'
import pendingColumns from './billing-statements-columns'
import { FC } from 'react'
import { useTableContext } from '@/providers/TableProvider'
import getPagination from '@/utils/pagination'

interface Props {
  count: number
}

const PendingTable: FC<Props> = ({ count }) => {
  const { filter, pagination } = useTableContext()
  const supabase = createBrowserClient()
  const { to, from } = getPagination(pagination.pageIndex, pagination.pageSize)

  const { data } = useQuery(getBillingStatements(supabase, filter, from, to))

  return (
    <DataTable
      count={count}
      columns={pendingColumns}
      data={(data as any) || []}
    />
  )
}
export default PendingTable
