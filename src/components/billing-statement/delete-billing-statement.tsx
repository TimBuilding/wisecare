'use client'
import useConfirmationStore from '@/components/confirmation-dialog/confirmationStore'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { Tables } from '@/types/database.types'
import { createBrowserClient } from '@/utils/supabase'
import { useInsertMutation } from '@supabase-cache-helpers/postgrest-react-query'
import { Trash } from 'lucide-react'
import { FC } from 'react'

interface DeleteBillingStatementProps<TData> {
  originalData: TData & Tables<'billing_statements'>
  setOpen: (_x: boolean) => void
}

const DeleteBillingStatement = <TData,>({
  originalData,
  setOpen,
}: DeleteBillingStatementProps<TData>) => {
  const { openConfirmation } = useConfirmationStore()
  const { toast } = useToast()

  const supabase = createBrowserClient()
  const { mutateAsync, isPending } = useInsertMutation(
    // @ts-ignore
    supabase.from('pending_billing_statements'),
    ['id'],
    'id',
    {
      onSuccess: () => {
        toast({
          variant: 'default',
          title: 'Request to Delete Billing Statement Sent',
          description:
            'Your request to delete the billing statement has been successfully sent for review by the admin.',
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
    const {
      data: { user },
    } = await supabase.auth.getUser()

    await mutateAsync([
      {
        mode_of_payment_id: originalData.mode_of_payment_id
          ? originalData.mode_of_payment_id
          : null,
        due_date: originalData.due_date ? originalData.due_date : null,
        or_number: originalData.or_number ? originalData.or_number : null,
        or_date: originalData.or_date ? originalData.or_date : null,
        sa_number: originalData.sa_number ? originalData.sa_number : null,
        amount: originalData.amount ? originalData.amount : null,
        total_contract_value: originalData.total_contract_value
          ? originalData.total_contract_value
          : null,
        balance: originalData.balance ? originalData.balance : null,
        billing_period: originalData.billing_period
          ? originalData.billing_period
          : null,
        amount_billed: originalData.amount_billed
          ? originalData.amount_billed
          : null,
        amount_paid: originalData.amount_paid ? originalData.amount_paid : null,
        commission_rate: originalData.commission_rate
          ? originalData.commission_rate
          : null,
        commission_earned: originalData.commission_earned
          ? originalData.commission_earned
          : null,
        account_id: originalData.account_id ? originalData.account_id : null,
        billing_statement_id: originalData.id ? originalData.id : null,
        is_delete_billing_statement: true,
        created_by: user?.id,
        operation_type: 'delete',
      },
    ])
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
