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
import { useTableContext } from '@/providers/TableProvider'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import { createBrowserClient } from '@/utils/supabase'
import { Skeleton } from '@/components/ui/skeleton'

interface DataTableProps<TData extends IData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

const DataTable = <TData extends IData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) => {
  const { pagination, setPagination } = useTableContext()

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

  const router = useRouter()

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    manualPagination: true,
    rowCount: data.length,
    state: {
      sorting,
      columnVisibility,
      pagination,
    },
  })

  const supabase = createBrowserClient()
  const { count: totalCount, isLoading } = useQuery(
    supabase
      .from('accounts')
      .select(
        'id, is_active, agent_id, company_name, company_address, nature_of_business, hmo_provider_id, previous_hmo_provider_id, current_hmo_provider_id, account_type_id, total_utilization, total_premium_paid, signatory_designation, contact_person, contact_number, principal_plan_type_id, dependent_plan_type_id, initial_head_count, effectivity_date, coc_issue_date, expiration_date, delivery_date_of_membership_ids, orientation_date, initial_contract_value, mode_of_payment_id, wellness_lecture_date, annual_physical_examination_date, commision_rate, additional_benefits, special_benefits, mode_of_premium_id, due_date, or_number, or_date, sa_number, amount, total_contract_value, balance, billing_period, summary_of_benefits, name_of_signatory, designation_of_contact_person, email_address_of_contact_person, created_at, updated_at',
        { head: true, count: 'exact' },
      ),
  )

  return (
    <AccountsProvider>
      <div className="flex flex-col">
        <PageHeader>
          <div className="flex w-full flex-col gap-6 sm:flex-row sm:justify-between">
            <div>
              <PageTitle>Accounts</PageTitle>
              {isLoading ? (
                <Skeleton className="h-4 w-20" />
              ) : (
                <PageDescription>{totalCount} Accounts</PageDescription>
              )}
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
