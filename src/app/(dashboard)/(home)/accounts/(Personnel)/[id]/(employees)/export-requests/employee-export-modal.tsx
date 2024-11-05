import React, { FC, useCallback } from 'react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { FileDown, Loader2 } from 'lucide-react'
import { createBrowserClient } from '@/utils/supabase'
import { useInsertMutation } from '@supabase-cache-helpers/postgrest-react-query'
import { toast } from '@/components/ui/use-toast'
import { useState } from 'react'
import { Enums } from '@/types/database.types'
import EmployeeDeleteRequests from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(employees)/export-requests/employee-delete-requests'

interface EmployeeExportModalProps {
  exportData: Enums<'export_type'>
}

const EmployeeExportModal: FC<EmployeeExportModalProps> = ({ exportData }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [pendingRequests, setPendingRequests] = useState('')
  const supabase = createBrowserClient()

  const { mutateAsync, isPending } = useInsertMutation(
    //@ts-ignore
    supabase.from('pending_export_requests'),
    ['id'],
    null,
    {
      onSuccess: () => {
        toast({
          title: 'Export Request Submitted',
          variant: 'default',
          description:
            'Your export request has been submitted and is waiting for approval',
        })
        setIsOpen(false)
      },
      onError: (error) => {
        toast({
          title: 'Something went wrong',
          variant: 'destructive',
          description: error.message,
        })
      },
    },
  )

  const handleApproval = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    const { data } = await supabase
      .from('pending_export_requests')
      .select('id')
      .eq('created_by', user?.id)
      .eq('export_type', exportData)
      .eq('is_active', true)
      .eq('is_approved', false)
      .single()

    if (data) {
      setPendingRequests(data.id)
      setIsDeleteOpen(true)
    } else {
      setIsOpen(true)
    }
  }, [exportData, supabase])

  const handleConfirm = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    await mutateAsync([
      {
        export_type: exportData,
        created_by: user?.id,
      },
    ])
  }

  return (
    <>
      <Button
        className="space-x-2"
        variant={'outline'}
        onClick={handleApproval}
      >
        <FileDown />
        <span>Export</span>
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Confirm Export Submission</DialogTitle>
          </DialogHeader>
          <div>
            Are you sure you want to submit this file for approval? Your export
            request will be reviewed before it is processed.
          </div>
          <DialogFooter>
            <Button
              variant={'default'}
              onClick={handleConfirm}
              disabled={isPending}
            >
              {isPending ? <Loader2 className="animate-spin" /> : 'Confirm'}
            </Button>
            <Button variant={'outline'} onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <EmployeeDeleteRequests
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        pendingRequestsId={pendingRequests}
      />
    </>
  )
}

export default EmployeeExportModal
