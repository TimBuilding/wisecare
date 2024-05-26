'use server'
import getAccounts from '@/queries/get-accounts'
import { createServerClient } from '@/utils/supabase'
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import { cookies } from 'next/headers'
import AccountsTable from './accounts-table'

const AccountsPage = async () => {
  const supabase = createServerClient(cookies())
  const queryClient = new QueryClient()
  await prefetchQuery(queryClient, getAccounts(supabase))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AccountsTable />
    </HydrationBoundary>
  )
}

export default AccountsPage
