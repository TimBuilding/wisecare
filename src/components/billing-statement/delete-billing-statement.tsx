'use client'
import useConfirmationStore from '@/components/confirmation-dialog/confirmationStore'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { createBrowserClient } from '@/utils/supabase'
import { useUpdateMutation } from '@supabase-cache-helpers/postgrest-react-query'
import { Trash } from 'lucide-react'
import { FC } from 'react'

interface DeleteBillingStatementProps {
  id: string
  setOpen: (_x: boolean) => void
}

const DeleteBillingStatement: FC<DeleteBillingStatementProps> = ({
  id,
  setOpen,
}: DeleteBillingStatementProps) => {
  const { openConfirmation } = useConfirmationStore()
  const { toast } = useToast()

  const supabase = createBrowserClient()
  const { mutateAsync, isPending } = useUpdateMutation(
    // @ts-ignore
    supabase.from('billing_statements'),
    ['id'],
    'id',
    {
      onSuccess: () => {
        toast({
          variant: 'default',
          title: 'Billing Statement Deleted',
          description: 'The billing statement has been successfully deleted.',
        })
        setOpen(false)
      },
      onError: (error) => {
        toast({
          variant: 'destructive',
          title: 'Something went wrong',
          description: error.message,
        })
      },
    },
  )

  const onDeleteHandler = async () => {
    await mutateAsync({
      id,
      is_active: false,
    })
  }
  return (
    <>
      <Button
        variant={'destructive'}
        type="button"
        disabled={isPending}
        onClick={() => {
          openConfirmation({
            title: 'Are you sure?',
            description:
              'This action CANNOT be undone. This will permanently delete the billing statement.',
            cancelLabel: 'Cancel',
            actionLabel: 'I understand, delete this billing statement',
            confirmationButtonVariant: 'destructive',
            onAction: () => onDeleteHandler(),
            onCancel: () => {},
          })
        }}
      >
        <Trash />
      </Button>
    </>
  )
}

export default DeleteBillingStatement
