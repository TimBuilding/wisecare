import { usePendingEmployeeContext } from '@/app/(dashboard)/admin/approval-request/company-employees/pending-employee-provider'
import ApprovalInformationItem from '@/app/(dashboard)/admin/approval-request/components/approval-information-item'
import { formatDate } from 'date-fns'

const EmployeeInformation = () => {
  const { selectedData } = usePendingEmployeeContext()
  return (
    <div className="grid grid-cols-2 gap-y-2">
      <ApprovalInformationItem
        label="Last Name"
        value={(selectedData as any)?.last_name}
      />
      <ApprovalInformationItem
        label="First Name"
        value={(selectedData as any)?.first_name}
      />
      <ApprovalInformationItem
        label="Account"
        value={(selectedData as any)?.account?.company_name}
      />
      <ApprovalInformationItem
        label="Birth Date"
        value={
          (selectedData as any)?.birth_date
            ? formatDate((selectedData as any).birth_date, 'PP')
            : undefined
        }
      />
      <ApprovalInformationItem
        label="Gender"
        value={(selectedData as any)?.gender}
      />
      <ApprovalInformationItem
        label="Civil Status"
        value={(selectedData as any)?.civil_status}
      />
      <ApprovalInformationItem
        label="Card Number"
        value={(selectedData as any)?.card_number}
      />
      <ApprovalInformationItem
        label="Effective Date"
        value={
          (selectedData as any)?.effective_date
            ? formatDate((selectedData as any).effective_date, 'PP')
            : undefined
        }
      />
      <ApprovalInformationItem
        label="Room Plan"
        value={(selectedData as any)?.room_plan}
      />
      <ApprovalInformationItem
        label="Maximum Benefit Limit"
        value={(selectedData as any)?.maximum_benefit_limit}
      />
    </div>
  )
}

export default EmployeeInformation
