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
import {
  PageDescription,
  PageHeader,
  PageTitle,
} from '@/components/page-header'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

const AccountsPage = async () => {
  const supabase = createServerClient(cookies())
  const queryClient = new QueryClient()
  await prefetchQuery(queryClient, getAccounts(supabase))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PageHeader>
        <div>
          <PageTitle>Accounts</PageTitle>
          <PageDescription>123 Accounts</PageDescription>
        </div>
        <Button className="space-x-2">
          <Plus />
          <span>Add</span>
        </Button>
      </PageHeader>
      <AccountsTable />
    </HydrationBoundary>
  )
}

export default AccountsPage
