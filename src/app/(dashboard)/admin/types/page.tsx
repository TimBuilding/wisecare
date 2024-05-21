'use server'
import { createServerClient } from '@/utils/supabase'
import TypeCard from './type-card'
import { cookies } from 'next/headers'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query'
import getTypes from '@/queries/get-types'

const TypesPage = async () => {
  const supabase = createServerClient(cookies())
  const queryClient = new QueryClient()

  await prefetchQuery(queryClient, getTypes(supabase, 'account_types'))
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TypeCard />
    </HydrationBoundary>
  )
}

export default TypesPage
