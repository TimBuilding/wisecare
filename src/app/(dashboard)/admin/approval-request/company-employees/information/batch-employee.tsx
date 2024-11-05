import { usePendingEmployeeContext } from '@/app/(dashboard)/admin/approval-request/company-employees/pending-employee-provider'
import { formatDate } from 'date-fns'
import ApprovalInformationItem from '@/app/(dashboard)/admin/approval-request/components/approval-information-item'

const BatchEmployee = () => {
  const { selectedData } = usePendingEmployeeContext()
  console.log(selectedData)
  return (
    <div className="max-h-[500px] divide-y-2 overflow-y-auto">
      {(selectedData as any)?.items.map((item: any) => (
        <div className="py grid grid-cols-2 gap-y-2" key={item.id}>
          <ApprovalInformationItem
            label="Last Name"
            value={(item as any)?.last_name}
          />
          <ApprovalInformationItem
            label="First Name"
            value={(item as any)?.first_name}
          />
          <ApprovalInformationItem
            label="Account"
            value={(item as any)?.account?.company_name}
          />
          <ApprovalInformationItem
            label="Birth Date"
            value={
              (selectedData as any)?.birth_date
                ? formatDate((item as any).birth_date, 'PP')
                : undefined
            }
          />
          <ApprovalInformationItem
            label="Gender"
            value={(item as any)?.gender}
          />
          <ApprovalInformationItem
            label="Civil Status"
            value={(item as any)?.civil_status}
          />
          <ApprovalInformationItem
            label="Card Number"
            value={(item as any)?.card_number}
          />
          <ApprovalInformationItem
            label="Effective Date"
            value={
              (item as any)?.effective_date
                ? formatDate((item as any).effective_date, 'PP')
                : undefined
            }
          />
          <ApprovalInformationItem
            label="Room Plan"
            value={(item as any)?.room_plan}
          />
          <ApprovalInformationItem
            label="Maximum Benefit Limit"
            value={(item as any)?.maximum_benefit_limit}
          />
        </div>
      ))}
    </div>
  )
}

export default BatchEmployee
