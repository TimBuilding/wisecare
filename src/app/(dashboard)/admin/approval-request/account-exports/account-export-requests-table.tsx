'use client'

import React from 'react'
import {
  PageDescription,
  PageHeader,
  PageTitle,
} from '@/components/page-header'
import { createBrowserClient } from '@/utils/supabase'
import getPendingAccountExports from '@/queries/get-pending-account-exports'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import { Skeleton } from '@/components/ui/skeleton'

const AccountExportRequestsTable = () => {
  const supabase = createBrowserClient()
  // TODO: Add data from table
  const { count, isPending } = useQuery(
    getPendingAccountExports(supabase, 'accounts'),
  )
  return (
    <div className="flex flex-col">
      <PageHeader>
        <div className="flex w-full flex-col gap-6 sm:flex-row sm:justify-between">
          <div>
            <PageTitle>Pending Account Exports</PageTitle>
            {isPending ? (
              <Skeleton className="h-4 w-20" />
            ) : (
              <PageDescription> {count} export requests</PageDescription>
            )}
          </div>
          <div>
            {/*TODO: Implement TableSearch component*/}
            {/*<TableSearch table={table} placeholder="Search requests" />*/}
          </div>
        </div>
      </PageHeader>
    </div>
  )
}

export default AccountExportRequestsTable
