import React from 'react'
import EmployeeExportsRequestsTable from '@/app/(dashboard)/admin/approval-request/employee-exports/employee-exports-requests-table'
import { createServerClient } from '@/utils/supabase'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query'
import getAllPendingEmployeeExports from '@/queries/get-all-pending-employee-exports'
import { cookies } from 'next/headers'
import EmployeeExportRequestsModal from '@/app/(dashboard)/admin/approval-request/employee-exports/employee-export-requests-modal'
import { EmployeeExportRequestsProvider } from '@/app/(dashboard)/admin/approval-request/employee-exports/employee-export-requests-provider'

const Page = async () => {
  const supabase = createServerClient(cookies())
  const queryClient = new QueryClient()
  await prefetchQuery(
    queryClient,
    getAllPendingEmployeeExports(supabase, 'employees', 'desc'),
  )
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EmployeeExportRequestsProvider>
        <EmployeeExportsRequestsTable />
        <EmployeeExportRequestsModal />
      </EmployeeExportRequestsProvider>
    </HydrationBoundary>
  )
}

export default Page
