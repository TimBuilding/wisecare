'use client'

import ExportAccountRequests from '@/app/(dashboard)/(home)/accounts/export-requests/export-account-requests'
import ExportAccountsModal from '@/app/(dashboard)/(home)/accounts/export-requests/export-accounts-modal'
import AccountRequest from '@/app/(dashboard)/(home)/accounts/request/account-request'
import {
  PageDescription,
  PageHeader,
  PageTitle,
} from '@/components/page-header'
import TablePagination from '@/components/table-pagination'
import TableSearch from '@/components/table-search'
import TableViewOptions from '@/components/table-view-options'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useToast } from '@/components/ui/use-toast'
import { useUserServer } from '@/providers/UserProvider'
import getAccounts from '@/queries/get-accounts'
import { createBrowserClient } from '@/utils/supabase'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
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
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import AccountsProvider from './accounts-provider'
import AddAccountButton from './add-account-button'

interface IData {
  id: string
}

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
  const [globalFilter, setGlobalFilter] = useState<any>('')
  const [isAccountLoading, setIsAccountLoading] = useState(false)

  const router = useRouter()
  const { toast } = useToast()
  const { user } = useUserServer()

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnVisibility,
      globalFilter,
    },
  })

  const supabase = createBrowserClient()
  const { count, isLoading } = useQuery(getAccounts(supabase))

  useEffect(() => {
    const upsertColumnVisibility = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const { error } = await supabase
        .from('accounts_column_visibility')
        .upsert(
          {
            user_id: user.id,
            columns: columnVisibility,
          },
          {
            onConflict: 'user_id',
          },
        )

      if (error) {
        return toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        })
      }
    }
    upsertColumnVisibility()
  }, [columnVisibility, supabase, toast])

  useEffect(() => {
    const getAccountsColumnVisibility = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from('accounts_column_visibility')
        .select('columns')
        .eq('user_id', user.id)
        .single()
      if (error) {
        return toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        })
      }
      if (data) {
        setColumnVisibility(data.columns)
      }
    }
    getAccountsColumnVisibility()
  }, [supabase, toast])

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
                <PageDescription>{count} Accounts</PageDescription>
              )}
            </div>
            <div className="flex flex-row gap-4">
              <TableSearch table={table} />
              <AddAccountButton />
              <ExportAccountsModal exportData={'accounts'} />
            </div>
          </div>
        </PageHeader>
        <div className="flex flex-row">
          {['marketing', 'after-sales'].includes(
            user?.user_metadata?.department,
          ) && <AccountRequest />}
          <ExportAccountRequests />
          <TableViewOptions table={table} />
        </div>
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
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => {
                    return (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && 'selected'}
                        className={`cursor-pointer transition-colors hover:bg-muted/50 ${isAccountLoading ? 'cursor-wait' : ''}`}
                        onClick={() => {
                          setIsAccountLoading(true)
                          router.push(`/accounts/${row.original.id}`)
                        }}
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
