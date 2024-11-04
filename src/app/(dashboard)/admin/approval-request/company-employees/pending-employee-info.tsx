'use client'
import EmployeeActionButton from '@/app/(dashboard)/admin/approval-request/company-employees/employee-action-button'
import { usePendingEmployeeContext } from '@/app/(dashboard)/admin/approval-request/company-employees/pending-employee-provider'
import ApprovalInformationItem from '@/app/(dashboard)/admin/approval-request/components/approval-information-item'
import OperationBadge from '@/app/(dashboard)/admin/approval-request/components/operation-badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { formatDate } from 'date-fns'
import { Loader2 } from 'lucide-react'

const PendingEmployeeInfo = () => {
  const { selectedData, isModalOpen, setIsModalOpen, isLoading } =
    usePendingEmployeeContext()

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-x-2">
            Pending Employee Approval Request
            <OperationBadge operationType={selectedData?.operation_type} />
          </DialogTitle>
          <DialogDescription>
            Created by {(selectedData as any)?.created_by?.first_name}{' '}
            {(selectedData as any)?.created_by?.last_name} on{' '}
            {selectedData?.created_at
              ? formatDate(selectedData.created_at, 'PP')
              : 'unknown date'}
          </DialogDescription>
        </DialogHeader>

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

        <DialogFooter>
          <EmployeeActionButton action="reject">
            <Button variant={'destructive'} disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin" /> : 'Reject'}
            </Button>
          </EmployeeActionButton>
          <EmployeeActionButton action="approve">
            <Button variant={'default'} disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin" /> : 'Approve'}
            </Button>
          </EmployeeActionButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default PendingEmployeeInfo
