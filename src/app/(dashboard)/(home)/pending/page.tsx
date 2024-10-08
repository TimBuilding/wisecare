'use server'

import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query'
import PendingTable from './pending-table'
import { cookies } from 'next/headers'
import getPendingAccounts from '@/queries/get-pending-accounts'
import { createServerClient } from '@/utils/supabase'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'

const PendingPage = async () => {
  const supabase = createServerClient(cookies())
  const queryClient = new QueryClient()
  await prefetchQuery(queryClient, getPendingAccounts(supabase))
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PendingTable />
    </HydrationBoundary>
  )
}

export default PendingPage
