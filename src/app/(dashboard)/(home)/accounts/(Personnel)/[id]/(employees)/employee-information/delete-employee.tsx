'use client'
import { useCompanyContext } from '@/app/(dashboard)/(home)/accounts/(Personnel)/[id]/(company profile)/company-provider'
import useConfirmationStore from '@/components/confirmation-dialog/confirmationStore'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { useToast } from '@/components/ui/use-toast'
import { createBrowserClient } from '@/utils/supabase'
import { useInsertMutation } from '@supabase-cache-helpers/postgrest-react-query'
import { Trash2 } from 'lucide-react'
import { FC } from 'react'
import { v4 as uuidv4 } from 'uuid'

interface DeleteEmployeeProps<TData> {
  originalData: TData
}

const DeleteEmployee: FC<DeleteEmployeeProps<any>> = ({ originalData }) => {
  const { userRole } = useCompanyContext()
  const { openConfirmation, closeConfirmation } = useConfirmationStore()
  const supabase = createBrowserClient()
  const { toast } = useToast()

  const { mutateAsync, isPending } = useInsertMutation(
    // @ts-ignore
    supabase.from('pending_company_employees'),
    ['id'],
    null,
    {
      onSuccess: () => {
        toast({
          variant: 'default',
          title: 'Employee deletion request submitted!',
          description:
            'Your request to delete the employee has been submitted successfully and is awaiting approval.',
        })
        closeConfirmation()
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

  if (
    !userRole ||
    !['marketing', 'finance', 'under-writing', 'after-sales', 'admin'].includes(
      userRole,
    )
  ) {
    return null
  }

  const handleDelete = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    await mutateAsync([
      {
        account_id: originalData.account_id,
        first_name: originalData.first_name,
        last_name: originalData.last_name,
        birth_date: originalData.birth_date,
        gender: originalData.gender,
        civil_status: originalData.civil_status,
        card_number: originalData.card_number,
        effective_date: originalData.effective_date,
        room_plan: originalData.room_plan,
        maximum_benefit_limit: originalData.maximum_benefit_limit,
        company_employee_id: originalData.id,
        operation_type: 'delete',
        is_delete_employee: true,
        is_active: true,
        created_by: user?.id,
        batch_id: uuidv4(),
      },
    ])
  }

  return (
    <>
      <DropdownMenuItem
        className="cursor-pointer text-destructive"
        disabled={isPending}
        onClick={() => {
          openConfirmation({
            title: 'Are you sure?',
            description:
              'This action CANNOT be undone. This will permanently delete the employee.',
            cancelLabel: 'Cancel',
            actionLabel: 'I understand, delete this employee',
            confirmationButtonVariant: 'destructive',
            onAction: handleDelete,
            onCancel: () => {},
          })
        }}
      >
        <Trash2 className="mr-2 h-4 w-4" /> Delete
      </DropdownMenuItem>
    </>
  )
}

export default DeleteEmployee
