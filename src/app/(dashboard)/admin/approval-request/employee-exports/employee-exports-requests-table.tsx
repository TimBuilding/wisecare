'use client'

import React from 'react'
import {
  PageDescription,
  PageHeader,
  PageTitle,
} from '@/components/page-header'
import { createBrowserClient } from '@/utils/supabase'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import getAllPendingEmployeeExports from '@/queries/get-all-pending-employee-exports'
import { Skeleton } from '@/components/ui/skeleton'

const EmployeeExportsRequestsTable = () => {
  const supabase = createBrowserClient()
  // TODO: Add data from table
  const { count, isPending } = useQuery(
    getAllPendingEmployeeExports(supabase, 'employees'),
  )

  return (
    <div className="flex flex-col">
      <PageHeader>
        <div className="flex w-full flex-col gap-6 sm:flex-row sm:justify-between">
          <div>
            <PageTitle>Pending Employee Exports</PageTitle>
            {isPending ? (
              <Skeleton className="h-4 w-20" />
            ) : (
              <PageDescription>{count} export requests</PageDescription>
            )}
          </div>
          <div>
            {/*TODO: Add table search component*/}
            {/*<TableSearch table={table} placeholder="Search requests" />*/}
          </div>
        </div>
      </PageHeader>
    </div>
  )
}

export default EmployeeExportsRequestsTable
