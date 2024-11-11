import React from 'react'
import EmployeeExportsRequestsTable from '@/app/(dashboard)/admin/approval-request/employee-exports/employee-exports-requests-table'
import { createBrowserClient } from '@/utils/supabase'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query'
import getAllPendingEmployeeExports from '@/queries/get-all-pending-employee-exports'

const Page = async () => {
  const supabase = createBrowserClient()
  const queryClient = new QueryClient()
  await prefetchQuery(
    queryClient,
    getAllPendingEmployeeExports(supabase, 'employees', 'desc'),
  )
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EmployeeExportsRequestsTable />
    </HydrationBoundary>
  )
}

export default Page
