'use server'
import PendingBillingStatementsTable from '@/app/(dashboard)/admin/approval-request/billing-statements/pending-billing-statements-table'
import getPendingBillingStatements from '@/queries/ get-pending-billing-statements'
import { createServerClient } from '@/utils/supabase'
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { cookies } from 'next/headers'

const BillingStatementsApprovalRequestPage = async () => {
  const supabase = createServerClient(cookies())
  const queryClient = new QueryClient()
  await prefetchQuery(
    queryClient,
    getPendingBillingStatements(supabase, 'desc'),
  )

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PendingBillingStatementsTable />
    </HydrationBoundary>
  )
}

export default BillingStatementsApprovalRequestPage
