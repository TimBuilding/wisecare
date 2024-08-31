'use client'
import { Skeleton } from '@/components/ui/skeleton'
import getAgents from '@/queries/get-agents'
import { createBrowserClient } from '@/utils/supabase'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import { format } from 'date-fns'
import Avatar, { genConfig } from 'react-nice-avatar'

const AgentsListItem = ({
  userId,
  firstName,
  lastName,
  createdAt,
  isLoading,
}: {
  userId: string
  firstName: string
  lastName: string
  createdAt: string
  isLoading?: boolean
}) => {
  const config = genConfig(userId || '')

  return (
    <div className="flex flex-row items-center gap-4 bg-card px-6 py-4 hover:bg-muted">
      {isLoading ? (
        <Skeleton className="h-10 w-10 rounded-full" />
      ) : (
        <Avatar className="h-10 w-10" {...config} />
      )}
      <div className="flex flex-col">
        <span className="text-sm font-medium text-card-foreground">
          {isLoading ? (
            <Skeleton className="h-4 w-40" />
          ) : (
            `${firstName} ${lastName}`
          )}
        </span>
      </div>
      <span className="text-sm capitalize text-muted-foreground">
        {isLoading ? (
          <Skeleton className="h-4 w-20" />
        ) : (
          <>
            <span>Joined</span> {format(new Date(createdAt), 'PPP')}
          </>
        )}
      </span>
    </div>
  )
}

const AgentsList = () => {
  const supabase = createBrowserClient()

  const { data, isPending } = useQuery(getAgents(supabase))

  return (
    <div className="flex w-full flex-col divide-y divide-border border-y border-border">
      {isPending &&
        [...Array(5)].map((_, i) => (
          <AgentsListItem
            isLoading
            key={i}
            userId={''}
            firstName={''}
            lastName={''}
            createdAt={''}
          />
        ))}
      {data &&
        data[0].user_profiles.map((agent) => (
          <AgentsListItem
            key={agent.user_id}
            userId={agent.user_id}
            firstName={agent.first_name || ''}
            lastName={agent.last_name || ''}
            createdAt={agent.created_at || ''}
          />
        ))}
    </div>
  )
}

export default AgentsList
