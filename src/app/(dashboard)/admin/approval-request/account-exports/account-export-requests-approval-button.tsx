import React from 'react'
import { FC, ReactNode } from 'react'
import { createBrowserClient } from '@/utils/supabase'
import { useUpdateMutation } from '@supabase-cache-helpers/postgrest-react-query'
import { toast } from '@/components/ui/use-toast'
import { useAccountExportRequestsContext } from '@/app/(dashboard)/admin/approval-request/account-exports/account-export-requests-provider'

interface AccountExportRequestsApprovalButtonProps {
  children: ReactNode
  action: 'approve' | 'reject'
  exportId: string
}

const AccountExportRequestsApprovalButton: FC<
  AccountExportRequestsApprovalButtonProps
> = ({ children, action, exportId }) => {
  const supabase = createBrowserClient()
  const { setIsModalOpen } = useAccountExportRequestsContext()

  const { mutateAsync, isPending } = useUpdateMutation(
    //@ts-expect-error
    supabase.from('pending_export_requests'),
    ['id'],
    null,
    {
      onSuccess: () => {
        toast({
          title: `Request ${action === 'approve' ? 'approved' : 'rejected'}`,
          description: `The request has been ${action === 'approve' ? 'approved' : 'rejected'} successfully`,
        })
        setIsModalOpen(false)
      },
      onError: () => {
        toast({
          title: 'Error',
          description: 'An error occurred while approving the request',
        })
      },
    },
  )

  const handleApproval = async () => {
    if (action === 'approve') {
      await mutateAsync({ id: exportId, is_approved: true })
    } else {
      await mutateAsync({ id: exportId, is_approved: false, is_active: false })
    }
  }

  return <div onClick={handleApproval}> {children} </div>
}

export default AccountExportRequestsApprovalButton
