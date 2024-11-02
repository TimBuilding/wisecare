import DeleteRequest from '@/app/(dashboard)/(home)/accounts/request/delete-request'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tables } from '@/types/database.types'
import { formatDistanceToNow } from 'date-fns'
import { FC } from 'react'

interface AccountRequestListItemProps {
  pendingAccount: Tables<'pending_accounts'>
}

const AccountRequestListItem: FC<AccountRequestListItemProps> = ({
  pendingAccount,
}) => {
  const badgeIcon = () => {
    switch (pendingAccount.operation_type) {
      case 'insert':
        return (
          <Badge
            variant="outline"
            className="w-fit bg-green-100 text-green-500"
          >
            Add
          </Badge>
        )
      case 'update':
        return (
          <Badge
            variant="outline"
            className="w-fit bg-yellow-100 text-yellow-500"
          >
            Edit
          </Badge>
        )
      case 'delete':
        return (
          <Badge
            variant="destructive"
            className="w-fit bg-red-100 text-red-500"
          >
            Delete
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="grid grid-cols-2 items-center gap-y-2 px-2 py-6">
      {badgeIcon()}
      <span className="ml-auto w-fit text-sm text-muted-foreground">
        {formatDistanceToNow(new Date(pendingAccount.created_at), {
          addSuffix: true,
        })}
      </span>

      <p className="text-sm font-medium">{pendingAccount.company_name}</p>
      <DeleteRequest pendingAccountId={pendingAccount.id} />
    </div>
  )
}

export default AccountRequestListItem
