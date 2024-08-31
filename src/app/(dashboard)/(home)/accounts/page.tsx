'use server'
import TableProvider from '@/providers/TableProvider'
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

  const { count } = await supabase
    .from('accounts')
    .select('*', { count: 'exact', head: true })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TableProvider>
        <AccountsTable count={count || 0} />
      </TableProvider>
    </HydrationBoundary>
  )
}

export default AccountsPage
