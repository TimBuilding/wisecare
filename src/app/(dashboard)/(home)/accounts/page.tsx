'use server'
import { createServerClient } from '@/utils/supabase'
import DataTable from './data-table'
import marketingColumns from './marketing-columns'
import { cookies } from 'next/headers'
import getAccounts from '@/queries/get-accounts'
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
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
