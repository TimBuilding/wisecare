'use server'

import { ApprovalRequestProvider } from '@/app/(dashboard)/admin/approval-request/approval-request-provider'
import ApprovalRequestTable from '@/app/(dashboard)/admin/approval-request/approval-request-table'
import ApprovalRequestInfo from '@/app/(dashboard)/admin/approval-request/modal/approval-request-info'
import getPendingAccounts from '@/queries/get-pending-accounts'
import { createServerClient } from '@/utils/supabase'
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { cookies } from 'next/headers'

const ApprovalRequestPage = async () => {
  const supabase = createServerClient(cookies())
  const queryClient = new QueryClient()
  await prefetchQuery(queryClient, getPendingAccounts(supabase, 'desc'))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ApprovalRequestProvider>
        <ApprovalRequestTable />
        <ApprovalRequestInfo />
      </ApprovalRequestProvider>
    </HydrationBoundary>
  )
}

export default ApprovalRequestPage
