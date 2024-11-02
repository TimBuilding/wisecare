import { FC } from 'react'

interface ApprovalInformationItemProps {
  label: string
  value?: string
}

const ApprovalInformationItem: FC<ApprovalInformationItemProps> = ({
  label,
  value,
}) => {
  return (
    <div className="flex flex-col py-1">
      <div className="text-sm font-medium text-muted-foreground">{label}</div>
      <div className="text-md text-pretty break-words font-semibold">
        {value !== undefined ? value : '-'}
      </div>
    </div>
  )
}

export default ApprovalInformationItem
