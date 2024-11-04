import { Tables } from '@/types/database.types'
import { FC } from 'react'
import OperationTypeBadge from '@/app/(dashboard)/admin/approval-request/components/operation-badge'
import { formatDistanceToNow } from 'date-fns'

interface EmployeeRequestListItemProps {
  data: Tables<'pending_company_employees'>
}

const EmployeeRequestListItem: FC<EmployeeRequestListItemProps> = ({
  data,
}) => {
  return (
    <div className="grid grid-cols-2 items-center gap-y-2 px-2 py-6">
      <OperationTypeBadge operationType={data.operation_type} />
      <span className="ml-auto w-fit text-sm text-muted-foreground">
        {formatDistanceToNow(new Date(data.created_at), {
          addSuffix: true,
        })}
      </span>

      <p className="text-sm font-medium">
        {data.first_name} {data.last_name}
      </p>
      {/* <DeleteEmployeeRequest pendingEmployeeId={data.id} /> */}
    </div>
  )
}

export default EmployeeRequestListItem
