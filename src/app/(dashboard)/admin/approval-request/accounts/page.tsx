'use server'
import { ApprovalRequestProvider } from '@/app/(dashboard)/admin/approval-request/accounts/approval-request-provider'
import ApprovalRequestTable from '@/app/(dashboard)/admin/approval-request/accounts/approval-request-table'
import getPendingAccounts from '@/queries/get-pending-accounts'
import { createServerClient } from '@/utils/supabase'
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { cookies } from 'next/headers'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const ApprovalRequestInfo = dynamic(
  () =>
    import(
      '@/app/(dashboard)/admin/approval-request/accounts/approval-request-info'
    ),
  { ssr: false },
)

const ApprovalRequestPage = async () => {
  const supabase = createServerClient(cookies())
  const queryClient = new QueryClient()
  await prefetchQuery(queryClient, getPendingAccounts(supabase, 'desc'))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ApprovalRequestProvider>
        <ApprovalRequestTable />
        <Suspense fallback={<div>Loading...</div>}>
          <ApprovalRequestInfo />
        </Suspense>
      </ApprovalRequestProvider>
    </HydrationBoundary>
  )
}

export default ApprovalRequestPage
