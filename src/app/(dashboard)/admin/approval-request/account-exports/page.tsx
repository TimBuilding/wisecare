import React from 'react'
import AccountExportRequestsTable from '@/app/(dashboard)/admin/approval-request/account-exports/account-export-requests-table'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query'
import getPendingAccountExports from '@/queries/get-pending-account-exports'
import { createServerClient } from '@/utils/supabase'
import { cookies } from 'next/headers'

const ExportRequestPage = async () => {
  const supabase = createServerClient(cookies())
  const queryClient = new QueryClient()
  await prefetchQuery(
    queryClient,
    getPendingAccountExports(supabase, 'accounts', 'desc'),
  )
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AccountExportRequestsTable />
    </HydrationBoundary>
  )
}

export default ExportRequestPage
