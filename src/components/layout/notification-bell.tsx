'use client'
import { PopoverContent } from '@radix-ui/react-popover'
import { Bell } from 'lucide-react'
import { Button } from '../ui/button'
import { Popover, PopoverTrigger } from '../ui/popover'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import getNotifications from '@/queries/get-notifications'
import { createBrowserClient } from '@/utils/supabase'
import { User } from '@supabase/supabase-js'
import { FC } from 'react'
import { Skeleton } from '../ui/skeleton'

interface Props {
  user: User | null
}

const NotificationBell: FC<Props> = ({ user }) => {
  const supabase = createBrowserClient()

  const { data, isPending } = useQuery(getNotifications(supabase, user?.id))

  return (
    <Popover>
      <PopoverTrigger asChild={true}>
        <Button variant={'ghost'} size={'icon'}>
          <Bell className="text-muted-foreground/50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 rounded-xl border border-border bg-card shadow-lg">
        <div className="grid">
          <div className="space-y-2 p-6">
            <h4 className="font-medium leading-none">Notifications</h4>
            <p className="text-sm text-muted-foreground">
              You have {data?.length || 0} notifications
            </p>
          </div>
          <div className="grid gap-2">
            {data?.map((notification) => (
              <div
                key={notification.id}
                className="flex cursor-pointer flex-col px-7 py-4 hover:bg-muted/50"
              >
                <span className="text-sm font-medium">
                  {notification.title}
                </span>
                <span className="text-sm text-muted-foreground">
                  {notification.description}
                </span>
              </div>
            ))}
            {isPending &&
              [...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="flex cursor-pointer flex-col space-y-2 px-7 py-4 hover:bg-muted/50"
                >
                  <span className="text-sm font-medium">
                    <Skeleton className="h-4 w-32" />
                  </span>
                  <span className="text-sm text-muted-foreground">
                    <Skeleton className="h-4 w-52" />
                  </span>
                </div>
              ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default NotificationBell
