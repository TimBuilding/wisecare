'use client'

import { Skeleton } from '@/components/ui/skeleton'
import getUsers from '@/queries/get-users'
import { Tables } from '@/types/database.types'
import { createBrowserClient } from '@/utils/supabase'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import Avatar, { genConfig } from 'react-nice-avatar'

const UserListItem = ({
  userId,
  firstName,
  lastName,
  department,
  isLoading,
}: {
  userId?: string
  firstName?: string
  lastName?: string
  department?: string
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
        <span className="text-sm capitalize text-muted-foreground">
          {department}
        </span>
      </div>
    </div>
  )
}

const UserList = () => {
  const supabase = createBrowserClient()

  const { data, isPending } = useQuery(getUsers(supabase))

  return (
    <div className="flex w-full flex-col divide-y divide-border border-y border-border">
      {isPending &&
        [...Array(5)].map((_, index) => <UserListItem key={index} isLoading />)}
      {data?.map((user) => (
        <UserListItem
          key={user.user_id}
          userId={user.user_id}
          firstName={user.first_name || ''}
          lastName={user.last_name || ''}
          department={user.departments?.name || ''}
        />
      ))}
    </div>
  )
}

export default UserList
