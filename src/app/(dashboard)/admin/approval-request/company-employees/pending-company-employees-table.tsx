'use client'

import pendingCompanyEmployeesColumns from '@/app/(dashboard)/admin/approval-request/company-employees/pending-company-employees-columns'
import PendingEmployeesRow from '@/app/(dashboard)/admin/approval-request/company-employees/pending-employees-row'
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
import getPendingCompanyEmployees from '@/queries/get-pending-company-employees'
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

const PendingCompanyEmployeesTable = () => {
  const supabase = createBrowserClient()
  const { count, data } = useQuery(getPendingCompanyEmployees(supabase, 'desc'))

  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState<any>('')

  const table = useReactTable({
    data: (data as any) || [],
    columns: pendingCompanyEmployeesColumns,
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
            <PageTitle>Pending Company Employees</PageTitle>
            <PageDescription>{count} pending company employees</PageDescription>
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
              <PendingEmployeesRow
                table={table}
                columns={pendingCompanyEmployeesColumns}
              />
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default PendingCompanyEmployeesTable
