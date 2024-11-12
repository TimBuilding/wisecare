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
import AccountExportRequestModal from '@/app/(dashboard)/admin/approval-request/account-exports/account-export-request-modal'
import { AccountExportRequestsProvider } from '@/app/(dashboard)/admin/approval-request/account-exports/account-export-requests-provider'

const ExportRequestPage = async () => {
  const supabase = createServerClient(cookies())
  const queryClient = new QueryClient()
  await prefetchQuery(
    queryClient,
    getPendingAccountExports(supabase, 'accounts', 'desc'),
  )
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AccountExportRequestsProvider>
        <AccountExportRequestsTable />
        <AccountExportRequestModal />
      </AccountExportRequestsProvider>
    </HydrationBoundary>
  )
}

export default ExportRequestPage
