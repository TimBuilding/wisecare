'use server'
import React from 'react'
import CompanyPage from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/company-page'
import { createServerClient } from '@/utils/supabase'
import { cookies } from 'next/headers'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query'
import getAccountById from '@/queries/get-account-by-id'

const Page = async ({ params }: { params: { id: string } }) => {
  const supabase = createServerClient(cookies())
  const queryClient = new QueryClient()

  await prefetchQuery(queryClient, getAccountById(supabase, params.id))
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CompanyPage companyId={params.id} />
    </HydrationBoundary>
  )
}

export default Page
