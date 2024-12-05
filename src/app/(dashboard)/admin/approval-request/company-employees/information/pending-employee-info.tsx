'use client'
import EmployeeActionButton from '@/app/(dashboard)/admin/approval-request/company-employees/employee-action-button'
import BatchEmployee from '@/app/(dashboard)/admin/approval-request/company-employees/information/batch-employee'
import EmployeeInformation from '@/app/(dashboard)/admin/approval-request/company-employees/information/employee-information'
import { usePendingEmployeeContext } from '@/app/(dashboard)/admin/approval-request/company-employees/pending-employee-provider'
import ApprovalInformationItem from '@/app/(dashboard)/admin/approval-request/components/approval-information-item'
import OperationBadge from '@/app/(dashboard)/admin/approval-request/components/operation-badge'
import { Badge } from '@/components/ui/badge'
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
            <div className="flex items-center gap-x-1">
              <OperationBadge operationType={selectedData?.operation_type} />
              {(selectedData as any)?.items && (
                <>
                  <Badge
                    variant="outline"
                    className="w-fit bg-blue-400 text-blue-50"
                  >
                    Batch
                  </Badge>
                  <Badge variant={'outline'}>
                    {(selectedData as any)?.items.length} Employees
                  </Badge>
                </>
              )}
            </div>
          </DialogTitle>
          <DialogDescription>
            Created by {(selectedData as any)?.created_by?.first_name}{' '}
            {(selectedData as any)?.created_by?.last_name} on{' '}
            {selectedData?.created_at
              ? formatDate(selectedData.created_at, 'PP')
              : 'unknown date'}
          </DialogDescription>
        </DialogHeader>

        {(selectedData as any)?.items ? (
          <BatchEmployee />
        ) : (
          <EmployeeInformation />
        )}

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
