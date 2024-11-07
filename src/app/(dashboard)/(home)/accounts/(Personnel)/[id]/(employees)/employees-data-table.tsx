'use client'

import EmployeeFormModal from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(employees)/employee-form-modal'
import EmployeesTableSearch from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(employees)/employees-table-search'
import ExportEmployees from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(employees)/export-employees'
import ImportEmployeesButton from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(employees)/import/import-employees-button'
import EmployeeRequest from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(employees)/request/employee-request'
import TablePagination from '@/components/table-pagination'
import { Button } from '@/components/ui/button'
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
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table'
import { Plus } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import EmployeeExportModal from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(employees)/export-requests/employee-export-modal'
import EmployeeExportRequests from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(employees)/export-requests/employee-export-requests'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

const EmployeesDataTable = <TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [globalFilter, setGlobalFilter] = useState<any>('')

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: 'includesString',
    state: {
      sorting,
      columnVisibility,
      globalFilter,
    },
  })

  return (
    <div>
      <div className="flex flex-row items-center justify-between gap-2 py-4">
        <EmployeesTableSearch table={table} />
        <div className="flex items-center space-x-1">
          <EmployeeFormModal
            button={
              <Button className="gap-2">
                <Plus /> <span> Add Employee </span>
              </Button>
            }
          />
          <ImportEmployeesButton />
          <EmployeeExportModal exportData={'employees'} />
        </div>
      </div>
      <div className="flex flex-row">
        <EmployeeRequest />
        <EmployeeExportRequests />
      </div>
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
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
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
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <TablePagination table={table} />
    </div>
  )
}

export default EmployeesDataTable
