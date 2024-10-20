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
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'

import TableSearch from '@/components/table-search'
import { Skeleton } from '@/components/ui/skeleton'
import { useTableContext } from '@/providers/TableProvider'
import { createBrowserClient } from '@/utils/supabase'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import DataTableRow from './data-table-row'
import AddBillingStatementButton from '@/app/(dashboard)/(home)/billing-statements/add-billing-statement-button'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  count: number
}

const DataTable = <TData, TValue>({
  columns,
  data,
  count,
}: DataTableProps<TData, TValue>) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const { pagination, setPagination } = useTableContext()

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    manualPagination: true,
    rowCount: count,
    state: {
      columnFilters,
      pagination,
    },
  })

  const supabase = createBrowserClient()
  const { count: totalCount, isLoading } = useQuery(
    supabase
      .from('billing_statements')
      .select('*', { head: true, count: 'exact' })
      .eq('is_active', true),
  )

  return (
    <div className="flex flex-col">
      <PageHeader>
        <div className="flex w-full flex-col gap-6 sm:flex-row sm:justify-between">
          <div>
            <PageTitle>Billing Statements</PageTitle>
            {isLoading ? (
              <Skeleton className="h-4 w-20" />
            ) : (
              <PageDescription>{totalCount} Billing Statements</PageDescription>
            )}
          </div>
          <div className="flex flex-row gap-4">
            <TableSearch />
            <AddBillingStatementButton />
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
              {/* @ts-ignore */}
              <DataTableRow table={table} columns={columns} />
            </TableBody>
          </Table>
        </div>
        <TablePagination table={table} />
      </div>
    </div>
  )
}

export default DataTable
