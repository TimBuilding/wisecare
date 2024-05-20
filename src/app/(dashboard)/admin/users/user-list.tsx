'use client'

import { Skeleton } from '@/components/ui/skeleton'
import getUsers from '@/queries/get-users'
import { Tables } from '@/types/database.types'
import { createBrowserClient } from '@/utils/supabase'
import { useQuery } from '@tanstack/react-query'
import Avatar, { genConfig } from 'react-nice-avatar'

const UserListItem = ({
  user,
  isLoading,
}: {
  user?: Tables<'user_profiles'>
  isLoading?: boolean
}) => {
  const uid = '123'
  const config = genConfig(user?.user_id ?? uid)
  return (
    <div className="flex flex-row items-center gap-4 bg-card px-6 py-4 hover:bg-muted">
      {isLoading ? (
        <Skeleton className="h-10 w-10 rounded-full" />
      ) : (
        <Avatar className="h-10 w-10" {...config} />
      )}
      <div className="flex flex-col">
        <span className="text-sm font-medium text-card-foreground">
          {isLoading ? <Skeleton className="h-4 w-40" /> : user?.first_name}
        </span>
        <span className="text-sm capitalize text-muted-foreground">
          {user?.department}
        </span>
      </div>
    </div>
  )
}

const UserList = ({
  initialUsers,
}: {
  initialUsers: Tables<'user_profiles'>[]
}) => {
  const supabase = createBrowserClient()

  const { data, isPending } = useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers(supabase),
    initialData: initialUsers,
  })

  return (
    <div className="flex w-full flex-col divide-y divide-border border-y border-border">
      {isPending &&
        [...Array(5)].map((_, index) => <UserListItem key={index} isLoading />)}
      {data?.map((user) => <UserListItem key={user.user_id} user={user} />)}
    </div>
  )
}

export default UserList
