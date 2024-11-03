'use client'
import { formatCurrency } from '@/app/(dashboard)/(home)/accounts/columns/accounts-columns'
import { useBillingStatementsRequestContext } from '@/app/(dashboard)/admin/approval-request/billing-statements/billing-statements-request-provider'
import ApprovalInformationItem from '@/app/(dashboard)/admin/approval-request/components/approval-information-item'
import OperationBadge from '@/app/(dashboard)/admin/approval-request/components/operation-badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { formatDate } from 'date-fns'

const BillingStatementInfo = () => {
  const { selectedData, isModalOpen, setIsModalOpen } =
    useBillingStatementsRequestContext()

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-x-2">
            Billing Statement Approval Request
            {/* <OperationBadge operationType={selectedData?.operation_type} /> */}
          </DialogTitle>
          <DialogDescription>
            Created by {(selectedData?.created_by as any)?.first_name}{' '}
            {(selectedData as any)?.created_by?.last_name} on{' '}
            {selectedData?.created_at
              ? formatDate(selectedData.created_at, 'PP')
              : 'unknown date'}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-y-2">
          <ApprovalInformationItem
            label="Account"
            value={(selectedData as any)?.account?.company_name}
          />
          <ApprovalInformationItem
            label="Mode of Payment"
            value={(selectedData as any)?.mode_of_payment?.name}
          />
          <ApprovalInformationItem
            label="Due Date"
            value={
              selectedData?.due_date
                ? formatDate(selectedData.due_date, 'PP')
                : undefined
            }
          />
          <ApprovalInformationItem
            label="OR Number"
            value={selectedData?.or_number ?? undefined}
          />
          <ApprovalInformationItem
            label="OR Date"
            value={
              selectedData?.or_date
                ? formatDate(selectedData.or_date, 'PP')
                : undefined
            }
          />
          <ApprovalInformationItem
            label="SA Number"
            value={selectedData?.sa_number ?? undefined}
          />
          <ApprovalInformationItem
            label="Amount"
            value={formatCurrency(selectedData?.amount)}
          />
          <ApprovalInformationItem
            label="Total Contract Value"
            value={formatCurrency(selectedData?.total_contract_value)}
          />
          <ApprovalInformationItem
            label="Balance"
            value={formatCurrency(selectedData?.balance)}
          />
          <ApprovalInformationItem
            label="Billing Period"
            value={selectedData?.billing_period?.toString() ?? undefined}
          />
          <ApprovalInformationItem
            label="Amount Billed"
            value={formatCurrency(selectedData?.amount_billed)}
          />
          <ApprovalInformationItem
            label="Amount Paid"
            value={formatCurrency(selectedData?.amount_paid)}
          />
          <ApprovalInformationItem
            label="Commission Rate"
            value={selectedData?.commission_rate?.toString() ?? undefined}
          />
          <ApprovalInformationItem
            label="Commission Earned"
            value={formatCurrency(selectedData?.commission_earned)}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default BillingStatementInfo
