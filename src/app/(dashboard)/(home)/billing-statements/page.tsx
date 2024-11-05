'use server'

import { BillingProvider } from '@/app/(dashboard)/(home)/billing-statements/billing-provider'
import getBillingStatements from '@/queries/get-billing-statements'
import pageProtect from '@/utils/page-protect'
import { createServerClient } from '@/utils/supabase'
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import PendingTable from './pending-table'

export const metadata = async (): Promise<Metadata> => {
  return {
    title: 'Billing Statements',
  }
}

const BillingStatementsPage = async () => {
  const supabase = createServerClient(cookies())
  const queryClient = new QueryClient()
  await prefetchQuery(queryClient, getBillingStatements(supabase))

  await pageProtect(['finance', 'admin'])

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BillingProvider>
        <PendingTable />
      </BillingProvider>
    </HydrationBoundary>
  )
}

export default BillingStatementsPage
