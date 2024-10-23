'use server'
import React from 'react'
import CompanyPage from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(company profile)/company-page'
import { createServerClient } from '@/utils/supabase'
import { cookies } from 'next/headers'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query'
import getAccountById from '@/queries/get-account-by-id'
import CompanyProvider from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(company profile)/company-provider'
import getRole from '@/utils/get-role'

const Page = async ({ params }: { params: { id: string } }) => {
  const supabase = createServerClient(cookies())
  const queryClient = new QueryClient()

  const role = await getRole()

  await prefetchQuery(queryClient, getAccountById(supabase, params.id))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CompanyProvider>
        <CompanyPage companyId={params.id} role={role} />
      </CompanyProvider>
    </HydrationBoundary>
  )
}

export default Page
