'use client'
import { createBrowserClient } from '@/utils/supabase'
import { useUpdateMutation } from '@supabase-cache-helpers/postgrest-react-query'
import { FC, useCallback } from 'react'

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
    // @ts-ignore
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

export default NotificationItem
