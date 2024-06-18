import {
  PageDescription,
  PageHeader,
  PageTitle,
} from '@/components/page-header'
import { createServerClient } from '@/utils/supabase'
import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import { cookies } from 'next/headers'
import AgentsList from './agents-list'

const AgentsPage = async () => {
  const queryClient = new QueryClient()
  const supabase = createServerClient(cookies())

  await prefetchQuery(queryClient, supabase.from('agents').select('*'))
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-8">
        <PageHeader>
          <div>
            <PageTitle>Agents</PageTitle>
            <PageDescription>132 agents</PageDescription>
          </div>
        </PageHeader>

        <AgentsList />
      </div>
    </HydrationBoundary>
  )
}

export default AgentsPage
