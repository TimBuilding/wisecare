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
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Search } from 'lucide-react'
import { useState } from 'react'
import AccountsProvider from './accounts-provider'
import AddAccountButton from './add-account-button'
import AddAccountForm from './add-account-form'
import TableViewOptions from '@/components/table-view-options'
import { useRouter } from 'next/navigation'

interface IData {
  id: string
}
import TableSearch from '@/components/table-search'

interface DataTableProps<TData extends IData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

const DataTable = <TData extends IData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const router = useRouter()

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnVisibility,
      columnFilters,
    },
  })
  return (
    <AccountsProvider>
      <div className="flex flex-col">
        <PageHeader>
          <div className="flex w-full flex-col gap-6 sm:flex-row sm:justify-between">
            <div>
              <PageTitle>Accounts</PageTitle>
              <PageDescription>123 Accounts</PageDescription>
            </div>
            <div className="flex flex-row gap-4">
              <TableSearch />
              <AddAccountButton />
            </div>
          </div>
        </PageHeader>
        <TableViewOptions table={table} />
        <div className="h-full bg-card">
          <div className="rounded-md border">
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
                <AddAccountForm />
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => {
                    return (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && 'selected'}
                        onClick={() =>
                          router.push(`/accounts/${row.original.id}`)
                        }
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    )
                  })
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-16 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <TablePagination table={table} />
        </div>
      </div>
    </AccountsProvider>
  )
}

export default DataTable
