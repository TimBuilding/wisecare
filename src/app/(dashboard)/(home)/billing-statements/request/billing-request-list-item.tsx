import { Tables } from '@/types/database.types'
import OperationTypeBadge from '@/app/(dashboard)/admin/approval-request/components/operation-badge'
import { formatDistanceToNow } from 'date-fns'

interface PendingRequestListItemProps {
  data: Tables<'pending_billing_statements'>
  company_name: string
}

const PendingRequestListItem = ({
  data,
  company_name,
}: PendingRequestListItemProps) => {
  return (
    <div className="grid grid-cols-2 items-center gap-y-2 px-2 py-6">
      <OperationTypeBadge operationType={data.operation_type} />
      <span className="ml-auto w-fit text-sm text-muted-foreground">
        {formatDistanceToNow(new Date(data.created_at), {
          addSuffix: true,
        })}
      </span>

      <p className="text-sm font-medium">
        {company_name} - {data.or_number}
      </p>
      {/* <DeleteRequest pendingAccountId={pendingAccount.id} /> */}
    </div>
  )
}

export default PendingRequestListItem
