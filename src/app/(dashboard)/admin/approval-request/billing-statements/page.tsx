'use server'
import { BillingStatementsRequestProvider } from '@/app/(dashboard)/admin/approval-request/billing-statements/billing-statements-request-provider'
import PendingBillingStatementsTable from '@/app/(dashboard)/admin/approval-request/billing-statements/pending-billing-statements-table'
import getPendingBillingStatements from '@/queries/ get-pending-billing-statements'
import { createServerClient } from '@/utils/supabase'
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import { cookies } from 'next/headers'
import { Suspense } from 'react'

const BillingStatementInfo = dynamic(
  () =>
    import(
      '@/app/(dashboard)/admin/approval-request/billing-statements/billing-statement-info'
    ),
  { ssr: false },
)

const BillingStatementsApprovalRequestPage = async () => {
  const supabase = createServerClient(cookies())
  const queryClient = new QueryClient()
  await prefetchQuery(
    queryClient,
    getPendingBillingStatements(supabase, 'desc'),
  )

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BillingStatementsRequestProvider>
        <PendingBillingStatementsTable />
        <Suspense fallback={<div>Loading...</div>}>
          <BillingStatementInfo />
        </Suspense>
      </BillingStatementsRequestProvider>
    </HydrationBoundary>
  )
}

export default BillingStatementsApprovalRequestPage
