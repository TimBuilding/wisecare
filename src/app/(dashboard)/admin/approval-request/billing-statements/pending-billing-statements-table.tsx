'use client'
import pendingBillingStatementsColumns from '@/app/(dashboard)/admin/approval-request/billing-statements/pending-billing-statements-column'
import {
  PageDescription,
  PageHeader,
  PageTitle,
} from '@/components/page-header'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import TableSearch from '@/components/table-search'
import getPendingBillingStatements from '@/queries/ get-pending-billing-statements'
import { createBrowserClient } from '@/utils/supabase'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'
import PendingBillingStatementDataTableRow from '@/app/(dashboard)/admin/approval-request/billing-statements/pending-billing-statement-data-table-row'
import TablePagination from '@/components/table-pagination'

const PendingBillingStatementsTable = () => {
  const supabase = createBrowserClient()
  const { data, count } = useQuery(
    getPendingBillingStatements(supabase, 'desc'),
  )

  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState<any>('')

  const table = useReactTable({
    data: (data as any) || [],
    columns: pendingBillingStatementsColumns,
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
            <PageTitle>Pending Billing Statements</PageTitle>
            <PageDescription>
              {count} pending billing statements
            </PageDescription>
          </div>
          <div>
            <TableSearch table={table} />
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
              <PendingBillingStatementDataTableRow
                table={table}
                columns={pendingBillingStatementsColumns}
              />
            </TableBody>
          </Table>
        </div>
        <TablePagination table={table} />
      </div>
    </div>
  )
}

export default PendingBillingStatementsTable
