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
import { useState } from 'react'
import { createBrowserClient } from '@/utils/supabase'
import { useInsertMutation } from '@supabase-cache-helpers/postgrest-react-query'
import { toast } from '@/components/ui/use-toast'
import { Enums } from '@/types/database.types'
import DeletePendingExportRequests from '@/app/(dashboard)/(home)/accounts/export-requests/delete-pending-export-requests'

interface ExportAccountsModalProps {
  exportData: Enums<'export_type'>
}

const ExportAccountsModal: FC<ExportAccountsModalProps> = ({ exportData }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const supabase = createBrowserClient()
  const [pendingRequest, setIsPendingRequest] = useState('')
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

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
      .eq('export_type', exportData)
      .eq('created_by', user?.id)
      .eq('is_active', true)
      .eq('is_approved', false)
      .single()
    if (data) {
      setIsDeleteOpen(true)
      setIsPendingRequest(data.id)
    } else {
      setIsOpen(true)
    }
  }, [exportData, supabase])

  const handleConfirm = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    const { data: oldAccountsData } = await supabase
      .from('accounts')
      .select('*')
      .eq('is_active', true)

    if (!oldAccountsData || oldAccountsData.length === 0) {
      toast({
        title: 'No accounts data found',
        variant: 'destructive',
        description:
          'Ensure there is data in the accounts table for this user.',
      })
      return
    }

    const accountsData = oldAccountsData.map((account) => ({
      ...account,
      agent: account.agent
        ? `${account.agent.first_name} ${account.agent.last_name}`
        : '',
      hmo_count: account.hmo_provider ? (account.hmo_provider as any).name : '',
      previous_hmo_provider: account.previous_hmo_provider
        ? (account.previous_hmo_provider as any).name
        : '',
      current_hmo_provider: account.current_hmo_provider
        ? (account.current_hmo_provider as any).name
        : '',
      account_type: account.account_type
        ? (account.account_type as any).name
        : '',
      principal_plan_type: account.principal_plan_type
        ? (account.principal_plan_type as any).name
        : '',
      dependent_plan_type: account.dependent_plan_type
        ? (account.dependent_plan_type as any).name
        : '',
      mode_of_payment: account.mode_of_payment
        ? (account.mode_of_payment as any).name
        : '',
    }))

    await mutateAsync([
      {
        export_type: exportData,
        created_by: user?.id,
        data: accountsData,
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
      <DeletePendingExportRequests
        pendingRequestsId={pendingRequest}
        onClose={() => setIsDeleteOpen(false)}
        isOpen={isDeleteOpen}
      />
    </>
  )
}

export default ExportAccountsModal
