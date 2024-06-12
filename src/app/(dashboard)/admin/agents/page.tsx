import { createServerClient } from '@/utils/supabase'
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import { cookies } from 'next/headers'

const AgentsPage = async () => {
  const queryClient = new QueryClient()
  const supabase = createServerClient(cookies())

  await prefetchQuery(queryClient, supabase.from('agents').select('*'))
  return <HydrationBoundary state={dehydrate(queryClient)}></HydrationBoundary>
}
