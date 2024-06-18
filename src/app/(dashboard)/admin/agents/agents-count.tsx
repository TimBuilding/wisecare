'use client'
import { PageDescription } from '@/components/page-header'
import getAgents from '@/queries/get-agents'
import { createBrowserClient } from '@/utils/supabase'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'

const AgentsCount = () => {
  const supabase = createBrowserClient()

  const { data } = useQuery(getAgents(supabase))

  return <PageDescription>{data?.length} Agents</PageDescription>
}

export default AgentsCount
