'use client'

import {
  PageDescription,
  PageHeader,
  PageTitle,
} from '@/components/page-header'
import TablePagination from '@/components/table-pagination'
import { Input } from '@/components/ui/input'
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
import { Search } from 'lucide-react'
import { useState } from 'react'

import { useTableContext } from '@/providers/TableProvider'
import DataTableRow from './data-table-row'
import { createBrowserClient } from '@/utils/supabase'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import { Skeleton } from '@/components/ui/skeleton'
import TableSearch from '@/components/table-search'

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
      .select('*', { head: true, count: 'exact' }),
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
            {/* <AddAccountButton /> */}
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
