import React, { FC } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Loader2, Trash } from 'lucide-react'
import {
  useInsertMutation,
  useUpdateMutation,
} from '@supabase-cache-helpers/postgrest-react-query'
import { toast } from '@/components/ui/use-toast'
import { createBrowserClient } from '@/utils/supabase'

interface EmployeeDeleteRequestsProps {
  isOpen: boolean
  onClose: () => void
  pendingRequestsId: string
}

const EmployeeDeleteRequests: FC<EmployeeDeleteRequestsProps> = ({
  isOpen,
  onClose,
  pendingRequestsId,
}) => {
  const supabase = createBrowserClient()

  const { mutateAsync, isPending } = useUpdateMutation(
    // @ts-expect-error
    supabase.from('pending_export_requests'),
    ['id'],
    null,
    {
      onSuccess: () => {
        toast({
          variant: 'default',
          title: 'Request deleted!',
          description: 'Successfully deleted request',
        })
        onClose()
      },
      onError: (err: any) => {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: err.message,
        })
      },
    },
  )

  const handleDeleteSubmission = async () => {
    await mutateAsync({ id: pendingRequestsId, is_active: false })
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Pending Request Notice</AlertDialogTitle>
          <AlertDialogDescription>
            Your request is awaiting admin approval. If you wish to make another
            export request, you may delete the current request.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={handleDeleteSubmission}
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <>
                <Trash className="mr-2 h-4 w-4" /> Delete Request
              </>
            )}
          </AlertDialogCancel>
          <AlertDialogAction disabled={isPending}>
            Wait for Approval
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default EmployeeDeleteRequests
