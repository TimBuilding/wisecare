import React, { FC } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { Tables } from '@/types/database.types'

interface ExportAccountRequestListItemProps {
  data: Tables<'pending_export_requests'>
}

const ExportAccountRequestListItem: FC<ExportAccountRequestListItemProps> = ({
  data,
}) => {
  return (
    <div className="grid grid-cols-2 items-center gap-2 px-2 py-6">
      <p className="text-sm font-medium">
        {(data.created_by as any).first_name}{' '}
        {(data.created_by as any).last_name}
      </p>
      <span className="ml-auto w-fit text-sm text-muted-foreground">
        {formatDistanceToNow(new Date(data.created_at), {
          addSuffix: true,
        })}
      </span>
    </div>
  )
}

export default ExportAccountRequestListItem
