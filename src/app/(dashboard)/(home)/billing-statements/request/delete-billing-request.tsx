'use client'

import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { createBrowserClient } from '@/utils/supabase'
import { useUpdateMutation } from '@supabase-cache-helpers/postgrest-react-query'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'

interface DeleteBillingRequestProps {
  pendingBillingId: string
}

const DeleteBillingRequest = ({
  pendingBillingId,
}: DeleteBillingRequestProps) => {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const { toast } = useToast()

  const supabase = createBrowserClient()
  const { mutate: updatePendingBilling, isPending } = useUpdateMutation(
    // @ts-expect-error
    supabase.from('pending_billing_statements'),
    ['id'],
    null,
    {
      onSuccess: () => {
        toast({
          variant: 'default',
          title: 'Request deleted!',
          description: 'Successfully deleted request',
        })
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

  const handleDelete = () => {
    updatePendingBilling({
      id: pendingBillingId,
      is_active: false,
    })
  }

  return (
    <>
      {confirmDelete ? (
        <Button
          size={'sm'}
          variant={'link'}
          className="ml-auto px-0 text-xs text-destructive"
          disabled={isPending}
          onClick={handleDelete}
        >
          {isPending ? <Loader2 className="animate-spin" /> : 'Are you sure?'}
        </Button>
      ) : (
        <Button
          size={'sm'}
          variant={'link'}
          className="ml-auto px-0 text-xs text-destructive"
          onClick={() => setConfirmDelete(true)}
        >
          Cancel
        </Button>
      )}
    </>
  )
}

export default DeleteBillingRequest
