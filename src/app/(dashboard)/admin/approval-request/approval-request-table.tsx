'use client'

import {
  PageDescription,
  PageHeader,
  PageTitle,
} from '@/components/page-header'
import TablePagination from '@/components/table-pagination'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'

import TableSearch from '@/components/table-search'
import { Skeleton } from '@/components/ui/skeleton'
import { useTableContext } from '@/providers/TableProvider'
import { createBrowserClient } from '@/utils/supabase'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import AddBillingStatementButton from '@/app/(dashboard)/(home)/billing-statements/add-billing-statement-button'
import getBillingStatements from '@/queries/get-billing-statements'
import getPendingAccounts from '@/queries/get-pending-accounts'
import approvalRequestColumns from '@/app/(dashboard)/admin/approval-request/approval-rerquest-columns'
import ApprovalRequestDataTableRow from '@/app/(dashboard)/admin/approval-request/approval-request-data-table-row'

const ApprovalRequestTable = () => {
  const supabase = createBrowserClient()
  const { data, count, isPending } = useQuery(
    getPendingAccounts(supabase, 'desc'),
  )

  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState<any>('')

  const table = useReactTable({
    data: data || [],
    columns: approvalRequestColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: 'includesString',
    state: {
      sorting,
      globalFilter,
    },
  })

  return (
    <div className="flex flex-col">
      <PageHeader>
        <div className="flex w-full flex-col gap-6 sm:flex-row sm:justify-between">
          <div>
            <PageTitle>Approval Requests</PageTitle>
            {isPending ? (
              <Skeleton className="h-4 w-20" />
            ) : (
              <PageDescription>{count} approval requests</PageDescription>
            )}
          </div>
          <div>
            <TableSearch table={table} placeholder="Search requests" />
          </div>
        </div>
      </PageHeader>

      <div className="flex h-full flex-col justify-between bg-card">
        <div className="h-full rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              <ApprovalRequestDataTableRow
                table={table}
                columns={approvalRequestColumns}
              />
            </TableBody>
          </Table>
        </div>
        <TablePagination table={table} />
      </div>
    </div>
  )
}

export default ApprovalRequestTable
