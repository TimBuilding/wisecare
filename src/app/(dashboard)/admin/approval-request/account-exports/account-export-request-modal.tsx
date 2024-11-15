'use client'
import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useAccountExportRequestsContext } from '@/app/(dashboard)/admin/approval-request/account-exports/account-export-requests-provider'
import { formatDate } from 'date-fns'
import ActionRequestButton from '@/app/(dashboard)/admin/approval-request/accounts/action-request-button'
import { Button } from '@/components/ui/button'
import AccountExportRequestsApprovalButton from '@/app/(dashboard)/admin/approval-request/account-exports/account-export-requests-approval-button'
import { Loader2 } from 'lucide-react'
import { useCompanyContext } from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(company profile)/company-provider'

const AccountExportRequestModal = () => {
  const { isModalOpen, setIsModalOpen, selectedData, isLoading } =
    useAccountExportRequestsContext()

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Confirm Action</DialogTitle>
          <DialogDescription>
            Please choose whether to approve or reject this export request.
          </DialogDescription>
        </DialogHeader>
        <div className="text-base">
          Would you like to approve this export request created by
          <span className="font-bold">
            {' '}
            {(selectedData?.created_by as any)?.first_name}{' '}
            {(selectedData?.created_by as any)?.last_name}{' '}
          </span>{' '}
          on
          <span className="font-bold">
            {' '}
            {selectedData?.created_at
              ? formatDate(selectedData.created_at, 'PP')
              : '-'}{' '}
          </span>
          ?
        </div>
        <div className="flex justify-end gap-x-2">
          <AccountExportRequestsApprovalButton
            action="reject"
            exportId={selectedData?.id as any}
          >
            <Button variant={'destructive'} disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin" /> : 'Reject'}
            </Button>
          </AccountExportRequestsApprovalButton>
          <AccountExportRequestsApprovalButton
            action="approve"
            exportId={selectedData?.id as any}
          >
            <Button variant={'default'} disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin" /> : 'Approve'}
            </Button>
          </AccountExportRequestsApprovalButton>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AccountExportRequestModal
