'use server'
import getAccounts from '@/queries/get-accounts'
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
import AccountsTable from './accounts-table'

export const metadata = async (): Promise<Metadata> => {
  return {
    title: 'Accounts',
  }
}

const AccountsPage = async () => {
  const supabase = createServerClient(cookies())
  const queryClient = new QueryClient()
  await prefetchQuery(queryClient, getAccounts(supabase))

  await pageProtect([
    'marketing',
    'after-sales',
    'under-writing',
    'finance',
    'admin',
  ])

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AccountsTable />
    </HydrationBoundary>
  )
}

export default AccountsPage
