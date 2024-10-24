import CompanyProvider from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(company profile)/company-provider'
import getAccountById from '@/queries/get-account-by-id'
import { createServerClient } from '@/utils/supabase'
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { cookies } from 'next/headers'
import { FC, ReactNode } from 'react'

interface Props {
  children: ReactNode
  params: { id: string }
}

const Layout: FC<Props> = async ({ children, params }) => {
  const supabase = createServerClient(cookies())
  const queryClient = new QueryClient()

  await prefetchQuery(queryClient, getAccountById(supabase, params.id))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CompanyProvider>{children}</CompanyProvider>
    </HydrationBoundary>
  )
}

export default Layout
