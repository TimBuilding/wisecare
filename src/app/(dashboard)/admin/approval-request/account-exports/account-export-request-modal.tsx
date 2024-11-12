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

const AccountExportRequestModal = () => {
  const { isModalOpen, setIsModalOpen, selectedData } =
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
          {/* TODO: Buttons for reject and approved*/}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AccountExportRequestModal
