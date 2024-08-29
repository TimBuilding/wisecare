'use client'
import { PopoverContent } from '@radix-ui/react-popover'
import { Bell } from 'lucide-react'
import { Button } from '../ui/button'
import { Popover, PopoverTrigger } from '../ui/popover'
import {
  useQuery,
  useUpdateMutation,
} from '@supabase-cache-helpers/postgrest-react-query'
import getNotifications from '@/queries/get-notifications'
import { createBrowserClient } from '@/utils/supabase'
import { User } from '@supabase/supabase-js'
import { FC, useCallback } from 'react'
import { Skeleton } from '../ui/skeleton'

interface NotificationItemProps {
  id: string
  title: string
  description: string
}

const NotificationItem: FC<NotificationItemProps> = ({
  id,
  title,
  description,
}) => {
  const supabase = createBrowserClient()

  const { mutateAsync } = useUpdateMutation(
    supabase.from('notifications'),
    ['id'],
    'read',
  )
  const handleReadNotification = useCallback(() => {
    mutateAsync({ id, read: true })
  }, [id, mutateAsync])

  return (
    <div
      onClick={handleReadNotification}
      className="flex cursor-pointer flex-col px-7 py-4 hover:bg-muted/50"
    >
      <span className="text-sm font-medium">{title}</span>
      <span className="text-sm text-muted-foreground">{description}</span>
    </div>
  )
}

interface Props {
  user: User | null
}

const NotificationBell: FC<Props> = ({ user }) => {
  const supabase = createBrowserClient()

  const { data, isPending } = useQuery(getNotifications(supabase, user?.id))

  return (
    <Popover>
      <PopoverTrigger asChild={true}>
        <Button variant={'ghost'} size={'icon'} className="relative">
          {data && data.length > 0 && (
            <span className="absolute right-2.5 top-1.5 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-500"></span>
            </span>
          )}
          <Bell className="text-muted-foreground/50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="z-50 mr-8 w-80 rounded-xl border border-border bg-card shadow-lg">
        <div className="grid">
          <div className="space-y-2 p-6">
            <h4 className="font-medium leading-none">Notifications</h4>
            <p className="text-sm text-muted-foreground">
              You have {data?.length || 0} notifications
            </p>
          </div>
          <div className="grid gap-2">
            {data?.map((notification) => (
              <NotificationItem
                key={notification.id}
                id={notification.id}
                title={notification.title}
                description={notification.description}
              />
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
