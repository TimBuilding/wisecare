import OperationBadge from '@/app/(dashboard)/admin/approval-request/components/operation-badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

const BillingStatementInfo = () => {
  return (
    <Dialog>
      <DialogContent className="max-w-6xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-x-2">
            Billing Statement Approval Request
            {/* <OperationBadge operationType={selectedData?.operation_type} /> */}
          </DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default BillingStatementInfo
