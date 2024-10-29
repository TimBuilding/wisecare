'use server'

import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query'
import PendingTable from './pending-table'
import { cookies } from 'next/headers'
import getBillingStatements from '@/queries/get-billing-statements'
import { createServerClient } from '@/utils/supabase'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import pageProtect from '@/utils/page-protect'
import TableProvider from '@/providers/TableProvider'
import { Metadata } from 'next'

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
      <TableProvider>
        <PendingTable />
      </TableProvider>
    </HydrationBoundary>
  )
}

export default BillingStatementsPage
